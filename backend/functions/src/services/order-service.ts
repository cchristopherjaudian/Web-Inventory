import { OrderItems } from '@prisma/client';
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
import OrderRepository from '../repositories/order-repository';
import CartService from './cart-service';
import InventoryService from './inventory-service';

class OrderService {
    private _repo = new OrderRepository();
    private _inv = new InventoryService();
    private _cart = new CartService();

    public async createOrder(payload: TOrderPayload) {
        const inventories = await this._inv.invRepo.rawQueryList({
            where: {
                id: { in: payload.items.map((item) => item.inventoryId) },
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

            const isCartExists = await this._cart.getCart({
                where: { id: cartItem.cartId },
            });

            if (!isCartExists) throw new NotFoundError('Cart does not exists.');

            if (inventory.stock < cartItem?.quantity) {
                throw new BadRequestError('Insufficient stock.');
            }

            const updatedStock = inventory.stock - cartItem.quantity;

            await Promise.all([
                this._inv.updateInventory(inventory.id, {
                    stock: updatedStock,
                }),
                this._cart.deleteCartItem(cartItem?.cartId as string),
            ]);
        }

        const mappedItems = payload.items.map((k) => ({
            quantity: k.quantity,
            inventoryId: k.inventoryId,
        }));
        payload.items = mappedItems;

        return await this._repo.create(payload);
    }

    public async createOrderStatus(payload: TOrderStatus) {
        const hasOrder = await this._repo.findOneOrder({
            where: { id: payload.orderId },
        });
        if (!hasOrder) {
            throw new NotFoundError('Order does not exists.');
        }
        const hasOrderStatus = await this._repo.findOneOrderStatus({
            where: {
                orderId: payload.orderId,
                status: payload.status,
            },
        });
        if (hasOrderStatus) {
            throw new ResourceConflictError('Order status already exists.');
        }

        return await this._repo.createStatus(payload);
    }

    public async updateOrder(id: string, payload: Partial<TOrderWithoutItems>) {
        const hasOrder = await this._repo.findOneOrder({
            where: { id },
        });
        if (!hasOrder) {
            throw new NotFoundError('Order does not exists.');
        }

        return await this._repo.updateOrder(id, payload);
    }

    public async orders() {
        return await this._repo.list();
    }
}

export default OrderService;
