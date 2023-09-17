import {
    BadRequestError,
    NotFoundError,
} from '../lib/custom-errors/class-errors';
import { TOrderPayload } from '../lib/types/order-types';
import OrderRepository from '../repositories/order-repository';
import InventoryService from './inventory-service';

class OrderService {
    private _repo = new OrderRepository();
    private _inv = new InventoryService();

    public async createOrder(payload: TOrderPayload) {
        const inventoryIds = payload.items.map((item) => item.inventoryId);
        const inventories = await this._inv.invRepo.rawQueryList({
            where: { id: { in: inventoryIds } },
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

            if (inventory.stock < cartItem?.quantity) {
                throw new BadRequestError('Insufficient stock.');
            }
        }

        return inventories;
    }
}

export default OrderService;
