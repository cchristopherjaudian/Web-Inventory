import { OrderStatuses, PaymentStatuses, PrismaClient } from '@prisma/client';
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
import moment from 'moment-timezone';
import { getStockIndicator } from '../helpers/stock-indicator';

class OrderService {
    private _db: PrismaClient;
    private _defaultOrderParams = {
        include: {
            orderItems: {
                include: {
                    products: true,
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
            profile: {
                include: {
                    account: true,
                },
            },
        },
    };

    constructor(db: PrismaClient) {
        this._db = db;
    }

    public async createOrder(payload: TOrderPayload) {
        const mappedItems = await Promise.all(
            payload.items.map(async (item) => {
                const cart = await this._db.cart.findUnique({
                    where: { id: item.cartId },
                });
                if (!cart) throw new NotFoundError('Cart does not exists.');

                const inventories = await this._db.inventory.findMany({
                    where: {
                        productId: item.productId,
                    },
                    orderBy: [
                        {
                            expiration: 'asc',
                        },
                    ],
                });

                if (inventories.length === 0) {
                    throw new BadRequestError('Insufficient stock.');
                }

                const stockTotal = inventories.reduce(
                    (acc, curr) => acc + curr.stock,
                    0
                );
                if (cart.quantity > stockTotal) {
                    throw new BadRequestError('Insufficient stock.');
                }
                let currentQuantity = cart.quantity;
                inventories.every(async (inventory) => {
                    const currentStock = Math.max(
                        inventory.stock - currentQuantity,
                        0
                    );
                    currentQuantity = Math.max(
                        currentQuantity - inventory.stock,
                        0
                    );

                    inventory.stock = currentStock;
                    inventory.stockIndicator = getStockIndicator(currentStock);
                    await this._db.inventory.update({
                        where: {
                            id: inventory.id,
                        },
                        data: { ...inventory },
                    });

                    if (currentQuantity === 0) {
                        return false;
                    }

                    return true;
                });

                // deletes cart if not flagged as save
                !cart.saved &&
                    (await this._db.cart.delete({ where: { id: cart.id } }));

                return {
                    productId: item.productId,
                    quantity: cart.quantity,
                };
            })
        );

        return await this._db.orders.create({
            data: {
                profileId: payload.profileId,
                paymentMethod: payload.paymentMethod,
                orderItems: {
                    createMany: {
                        data: mappedItems,
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

    public async createOrderStatus(
        payload: TOrderStatus & { createdAt: Date }
    ) {
        const hasOrder = await this._db.orders.findFirst({
            where: { id: payload.orderId },
        });
        if (!hasOrder) {
            throw new NotFoundError('Order does not exists.');
        }
        const hasOrderStatus = await this._db.orderStatus.findFirst({
            where: {
                orders: {
                    id: payload.orderId,
                },
                status: payload.status,
            },
        });
        if (hasOrderStatus) {
            throw new ResourceConflictError('Order status already exists.');
        }

        payload.createdAt = moment(payload.createdAt)
            .tz('Asia/Manila')
            .toDate();
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

    public async ordersTxn() {
        const transactions = await this._db.orders.findMany({
            where: {
                status: PaymentStatuses.PAID,
            },
            include: {
                orderItems: {
                    include: {
                        products: true,
                    },
                },
                orderStatus: true,
            },
        });

        if (transactions.length === 0) return [];

        const mappedTransactions = transactions.map((txn) => {
            const totalPrice = txn.orderItems.reduce(
                (acc, item) =>
                    (acc = <any>item.products?.price * item.quantity),
                0
            );

            const dispatchedDate = txn.orderStatus.find(
                (order) => order.status === OrderStatuses.DISPATCHED
            );
            const dateDelivered = txn.orderStatus.find(
                (order) => order.status === OrderStatuses.DELIVERED
            );
            return {
                orderId: txn.id,
                dateOrdered: txn.createdAt,
                paymentMethod: txn.paymentMethod,
                itemsCount: txn.orderItems.length,
                totalPrice,
                dispatchedDate: dispatchedDate?.createdAt || null,
                dateDelivered: dateDelivered?.createdAt || null,
            };
        });

        return mappedTransactions;
    }
}

export default OrderService;
