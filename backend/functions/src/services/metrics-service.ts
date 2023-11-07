import { OrderStatuses, PaymentStatuses, StockIndicator } from '@prisma/client';
import moment from 'moment-timezone';
import { TOrderSales } from '../lib/types/order-types';
import {
    TGroupedQuantity,
    TMappedRptPayload,
    TRptListQuery,
} from '../lib/types/metrics-types';
import { TPrismaClient } from '../lib/prisma';

class MetricsService {
    private _db: TPrismaClient;

    constructor(db: TPrismaClient) {
        this._db = db;
    }

    public async sales(query: TOrderSales) {
        const startsAt = query.startsAt
            ? moment(query.startsAt).startOf('day').tz('Asia/Manila').toDate()
            : moment()
                  .startOf('year')
                  .startOf('day')
                  .tz('Asia/Manila')
                  .toDate();
        const endsAt = query.endsAt
            ? moment(query.endsAt).endOf('day').tz('Asia/Manila').toDate()
            : moment().endOf('year').endOf('day').tz('Asia/Manila').toDate();

        const [orders, products] = await Promise.all([
            this._db.orderItems.groupBy({
                _sum: {
                    quantity: true,
                },
                by: ['productId'],
                where: {
                    AND: [
                        { createdAt: { lte: endsAt } },
                        { createdAt: { gte: startsAt } },
                    ],
                },
            }),
            this._db.products.findMany({}),
        ]);
        if (orders.length === 0) return orders;

        const mappedOrders = await Promise.all(
            products.map(async (product) => {
                const order = orders.find(
                    (orderObj) => orderObj.productId === product.id
                );
                return {
                    name: product.name,
                    productId: product.id,
                    totalQty: order ? order?._sum.quantity : 0,
                    size: product.size,
                };
            })
        );

        return mappedOrders;
    }

    public async getPanels() {
        const [
            categoryGroup,
            {
                _sum: { quantity: products },
            },
            {
                _count: { id: lowStocks },
            },
            orders,
        ] = await Promise.all([
            this._db.orderItems.groupBy(this.byProductId as any),
            this._db.orderItems.aggregate({
                _sum: {
                    quantity: true,
                },
                where: {
                    orders: {
                        ...this._getPaidCriteria,
                    },
                },
            }),
            this._db.inventory.aggregate({
                _count: {
                    id: true,
                },
                where: {
                    stockIndicator: StockIndicator.LOW,
                },
            }),
            this._db.orderItems.groupBy(this.byProductId as any),
        ]);

        const topSelling = this.reducedQuantity(orders as TGroupedQuantity);
        const categories = this.reducedQuantity(
            categoryGroup as TGroupedQuantity
        );

        return { categories, products, lowStocks, topSelling };
    }

    private _mapReportList({ list, sales }: TMappedRptPayload) {
        return {
            list: list.length === 0 ? [] : list,
            sales: sales === 0 ? 0 : sales,
        };
    }

    public async getReportsList(query: TRptListQuery) {
        const startsAt = query.startsAt
            ? moment(query.startsAt).startOf('day').tz('Asia/Manila').toDate()
            : moment()
                  .startOf('year')
                  .startOf('day')
                  .tz('Asia/Manila')
                  .toDate();
        const endsAt = query.endsAt
            ? moment(query.endsAt).endOf('day').tz('Asia/Manila').toDate()
            : moment().endOf('year').endOf('day').tz('Asia/Manila').toDate();

        let queryStatus = {};
        if (query.status) {
            queryStatus = { status: query.status, isCurrent: true };
        }

        const orderStatusList = await this._db.orderStatus.groupBy({
            by: ['orderId'],
            where: {
                ...queryStatus,
                orders: {
                    AND: [
                        { createdAt: { lte: endsAt } },
                        { createdAt: { gte: startsAt } },
                    ],
                },
            },
        });

        const statusesIds = orderStatusList.map((k) => k.orderId);
        const [list, orderItems] = await Promise.all([
            this._db.orders.findMany({
                select: {
                    id: true,
                    paymentMethod: true,
                    status: true,
                    refNo: true,
                    _count: {
                        select: {
                            orderItems: true,
                        },
                    },
                    profile: true,
                    orderItems: {
                        select: {
                            quantity: true,
                            products: true,
                        },
                    },
                    orderStatus: true,
                    createdAt: true,
                },
                where: {
                    id: {
                        in: statusesIds as string[],
                    },
                },
            }),
            this._db.orderItems.groupBy({
                by: ['productId'],
                _sum: {
                    quantity: true,
                },
                where: {
                    orderId: {
                        in: statusesIds,
                    },
                },
                orderBy: [
                    {
                        _sum: {
                            quantity: 'desc',
                        },
                    },
                ],
                having: {
                    quantity: {
                        _sum: {
                            gte: parseInt(
                                process.env.TOP_SELLING_THRESHOLD as string
                            ),
                        },
                    },
                },
                take: 2,
            }),
        ]);

        const mappedOrders = list.map((order) => {
            const sumProducts = order.orderItems.reduce(
                (acc, item) => {
                    acc.amount = <any>item.products?.price * item.quantity;
                    acc.quantity = acc.quantity + item.quantity;
                    return acc;
                },
                { amount: 0, quantity: 0 }
            );

            const dispatchedDate = order.orderStatus.find(
                (order) => order.status === OrderStatuses.DISPATCHED
            );
            const dateDelivered = order.orderStatus.find(
                (order) => order.status === OrderStatuses.DELIVERED
            );
            return {
                orderId: order.id,
                dateOrdered: order.createdAt,
                paymentMethod: order.paymentMethod,
                itemsCount: sumProducts.quantity,
                totalPrice: sumProducts.amount,
                dispatchedDate: dispatchedDate?.createdAt || null,
                dateDelivered: dateDelivered?.createdAt || null,
                customerName: order.profile?.fullName,
            };
        });

        const reducedSales = await orderItems.reduce(
            async (acc, { productId, _sum }) => {
                const product = await this._db.products.findUnique({
                    where: { id: productId as string },
                });
                const accumulator = await acc;
                accumulator.sales = <any>product?.price * <any>_sum.quantity;
                accumulator.code.push(product?.code as string);

                return accumulator;
            },
            Promise.resolve({ sales: 0, code: [] as string[] })
        );

        return {
            list: mappedOrders,
            sales: reducedSales,
        };
    }

    private get _getPaidCriteria() {
        return {
            status: PaymentStatuses.PAID,
            AND: [
                { createdAt: { lte: moment().endOf('day').toDate() } },
                {
                    createdAt: {
                        gte: moment()
                            .startOf('day')
                            .subtract(7, 'days')
                            .toDate(),
                    },
                },
            ],
        };
    }

    private get byProductId() {
        return {
            by: ['productId'],
            _sum: { quantity: true },
            where: {
                orders: {
                    ...this._getPaidCriteria,
                },
            },
        };
    }

    private reducedQuantity(list: TGroupedQuantity) {
        if (list.length === 0) return 0;

        return list.reduce(
            (acc, curr) =>
                curr._sum.quantity! >= Number(process.env.TOP_SELLING_THRESHOLD)
                    ? acc + 1
                    : 0,
            0
        );
    }
}

export default MetricsService;
