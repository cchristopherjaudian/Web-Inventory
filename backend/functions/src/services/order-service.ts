import { OrderStatuses, PaymentStatuses, PrismaClient } from '@prisma/client';
import {
    BadRequestError,
    NotFoundError,
    ResourceConflictError,
} from '../lib/custom-errors/class-errors';
import {
    TOrderPayload,
    TOrderSales,
    TOrderStatus,
    TOrderWithoutItems,
} from '../lib/types/order-types';
import moment from 'moment-timezone';

class OrderService {
    private _db: PrismaClient;
    private _defaultOrderParams = {
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
            orderStatus: {
                include: {
                    profile: {
                        include: {
                            account: true,
                        },
                    },
                },
            },
        },
    };

    constructor(db: PrismaClient) {
        this._db = db;
    }

    public async createOrder(payload: TOrderPayload) {
        const inventories = await this._db.inventory.findMany({
            where: {
                id: {
                    in: payload.items.map(
                        (item) => item.inventoryId
                    ) as string[],
                },
            },
        });

        if (inventories.length === 0) {
            throw new NotFoundError('Inventory does not exists.');
        }

        for (const inventory of inventories) {
            const cartItem = payload.items.find(
                (item) => item.inventoryId === inventory.id
            );

            if (!cartItem) {
                throw new NotFoundError('Inventory does not exists.');
            }

            const isCartExists = await this._db.cart.findFirst({
                where: { id: cartItem.cartId },
            });

            if (!isCartExists) throw new NotFoundError('Cart does not exists.');

            if (inventory.stock < cartItem?.quantity) {
                throw new BadRequestError('Insufficient stock.');
            }

            const updatedStock = inventory.stock - cartItem.quantity;

            await Promise.all([
                this._db.inventory.update({
                    where: { id: inventory.id },
                    data: {
                        stock: updatedStock,
                    },
                }),
                !isCartExists.saved &&
                    this._db.cart.delete({ where: { id: cartItem?.cartId } }),
            ]);
        }

        const mappedItems = payload.items.map((k) => ({
            quantity: k.quantity,
            inventoryId: k.inventoryId,
        }));
        payload.items = mappedItems;

        return await this._db.orders.create({
            data: {
                profileId: payload.profileId,
                paymentMethod: payload.paymentMethod,
                orderItems: {
                    createMany: {
                        data: payload.items,
                    },
                },

                orderStatus: {
                    create: {
                        status: OrderStatuses.PREPARING,
                    },
                },
            },
        });
    }

    public async createOrderStatus(payload: TOrderStatus) {
        const hasOrder = await this._db.orders.findFirst({
            where: { id: payload.orderId },
        });
        if (!hasOrder) {
            throw new NotFoundError('Order does not exists.');
        }
        const hasOrderStatus = await this._db.orderStatus.findFirst({
            where: {
                orderId: payload.orderId,
                status: payload.status,
            },
        });
        if (hasOrderStatus) {
            throw new ResourceConflictError('Order status already exists.');
        }

        return await this._db.orderStatus.create({ data: payload });
    }

    public async updateOrder(id: string, payload: Partial<TOrderWithoutItems>) {
        const hasOrder = await this._db.orders.findFirst({
            where: { id },
        });
        if (!hasOrder) {
            throw new NotFoundError('Order does not exists.');
        }

        return await this._db.orders.update({
            where: { id },
            data: payload,
        });
    }

    public async endUserOrders(profileId?: string) {
        const params = {
            where: { profileId },
            ...this._defaultOrderParams,
        };
        return await this._db.orders.findMany(params);
    }

    public async adminOrders() {
        const params = {
            ...this._defaultOrderParams,
        };
        return await this._db.orders.findMany(params);
    }

    public async getOrder(id: string) {
        return this._db.orders.findFirst({
            where: { id },
            ...this._defaultOrderParams,
        });
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

export default OrderService;
