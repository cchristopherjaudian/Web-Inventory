import { PaymentStatuses, PrismaClient } from '@prisma/client';
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
                        inventory: {
                            include: {
                                products: true,
                            },
                        },
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

        const sales = flatOrders.reduce((acc, { quantity, inventory }) => {
            const total = <any>inventory?.products?.price * quantity;

            return acc + total;
        }, 0);

        return {
            sales,
        };
    }
}

export default MetricsService;
