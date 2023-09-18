import { OrderStatuses } from '@prisma/client';
import Prisma from '../lib/prisma';
import {
    TOrderPayload,
    TOrderStatus,
    TOrderWithoutItems,
} from '../lib/types/order-types';
import { TQueryArgs } from '../..';

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

    public async createStatus(payload: TOrderStatus) {
        return await this._db.orderStatus.create({ data: payload });
    }

    public async findOneOrder(query: TQueryArgs) {
        return await this._db.orders.findFirst(query);
    }

    public async findOneOrderStatus(query: TQueryArgs) {
        return await this._db.orderStatus.findFirst(query);
    }

    public async updateOrder(id: string, payload: Partial<TOrderWithoutItems>) {
        return await this._db.orders.update({
            where: { id },
            data: payload,
        });
    }

    public async list() {
        const params = {
            where: {},
            include: {
                OrderItems: {
                    include: {
                        inventory: {
                            include: {
                                products: true,
                            },
                        },
                    },
                },
                OrderStatus: {
                    include: {
                        account: true,
                    },
                },
            },
        };

        return await this._db.orders.findMany(params);
    }
}

export default OrderRepository;
