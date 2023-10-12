import {
    OrderItems,
    PaymentStatuses,
    PrismaClient,
    StockIndicator,
} from '@prisma/client';
import moment from 'moment-timezone';
import { TOrderSales } from '../lib/types/order-types';
import { TGroupedQuantity } from '../lib/types/metrics-types';
import { TPrismaClient } from '../lib/prisma';

class MetricsService {
    private _db: TPrismaClient;

    constructor(db: TPrismaClient) {
        this._db = db;
    }

    public async sales(query: TOrderSales) {
        const startsAt = moment(query.startsAt)
            .startOf('day')
            .tz('Asia/Manila')
            .toDate();
        const endsAt = moment(query.endsAt)
            .endOf('day')
            .tz('Asia/Manila')
            .toDate();

        const orders = await this._db.orders.findMany({
            include: {
                orderItems: {
                    include: {
                        products: true,
                    },
                },
            },
            where: {
                status: PaymentStatuses.PAID,
                AND: [
                    { createdAt: { lte: endsAt } },
                    { createdAt: { gte: startsAt } },
                ],
            },
        });

        if (orders.length === 0) return orders;

        const flatOrders = orders.flatMap((order) => order.orderItems);

        const sales = flatOrders.reduce((acc, { quantity, products }) => {
            const total = <any>products?.price * quantity;

            return acc + total;
        }, 0);

        return {
            sales,
        };
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
