import { PaymentStatuses, PrismaClient, StockIndicator } from '@prisma/client';
import moment from 'moment-timezone';
import { TOrderSales } from '../lib/types/order-types';

class MetricsService {
    private _db: PrismaClient;

    constructor(db: PrismaClient) {
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
        const endsAt = moment().endOf('day').toDate();
        const startsAt = moment().startOf('day').subtract(7, 'days').toDate();
        const [
            categoryGroup,
            products,
            {
                _count: { id: lowStocks },
            },
            orders,
        ] = await Promise.all([
            this._db.products.groupBy({
                by: ['category'],
            }),
            this._db.products.count(),
            this._db.inventory.aggregate({
                _count: {
                    id: true,
                },
                where: {
                    stockIndicator: StockIndicator.LOW,
                },
            }),
            this._db.orderItems.groupBy({
                by: ['productId'],
                where: {
                    orders: {
                        status: PaymentStatuses.PAID,
                        AND: [
                            { createdAt: { lte: endsAt } },
                            { createdAt: { gte: startsAt } },
                        ],
                    },
                },
                _sum: {
                    quantity: true,
                },
            }),
        ]);
        const category = categoryGroup.length;

        let topSelling = 0;
        if (orders.length > 0) {
            topSelling = orders.reduce(
                (acc, curr) =>
                    curr._sum.quantity! >=
                    Number(process.env.TOP_SELLING_THRESHOLD)
                        ? acc + 1
                        : 0,
                0
            );
        }

        return { category, products, lowStocks, topSelling };
    }
}

export default MetricsService;
