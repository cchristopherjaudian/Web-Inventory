import { OrderStatuses, PrismaClient } from '@prisma/client';
import {
    BadRequestError,
    NotFoundError,
    ResourceConflictError,
} from '../lib/custom-errors/class-errors';
import {
    TOrderPayload,
    TOrderStatus,
    TOrderWithoutItems,
} from '../lib/types/order-types';

class OrderService {
    private _db: PrismaClient;

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

    public async orders() {
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
                        profile: {
                            include: {
                                account: true,
                            },
                        },
                    },
                },
            },
        };
        return await this._db.orders.findMany(params);
    }
}

export default OrderService;
