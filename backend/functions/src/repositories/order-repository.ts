import { OrderStatuses } from '@prisma/client';
import Prisma from '../lib/prisma';
import { TOrderPayload } from '../lib/types/order-types';

class OrderRepository {
    private _db = Prisma.Instance.db;

    public async create(payload: TOrderPayload) {
        try {
            return await this._db.orders.create({
                data: {
                    accountId: payload.accountId,
                    paymentMethod: payload.paymentMethod,

                    OrderItems: {
                        createMany: {
                            data: payload.items,
                        },
                    },

                    OrderStatus: {
                        create: {
                            status: OrderStatuses.PREPARING,
                        },
                    },
                },
            });
        } catch (error) {
            throw error;
        } finally {
            await this._db.$disconnect();
        }
    }
}

export default OrderRepository;
