import { StockIndicator } from '@prisma/client';
import moment from 'moment-timezone';
import INVENTORY_CONSTANTS from '../../commons/inventory-contants';
import { TInventory, TInventoryList } from '../lib/types/inventory-types';
import InventoryRepository from '../repositories/inventory-repository';
import {
    BadRequestError,
    NotFoundError,
    ResourceConflictError,
} from '../lib/custom-errors/class-errors';

class InventoryService {
    private _repo = new InventoryRepository();

    private getStockIndicator(stock: number) {
        if (stock < INVENTORY_CONSTANTS.Threshold) {
            return StockIndicator.LOW;
        }

        if (stock > INVENTORY_CONSTANTS.Threshold) {
            return StockIndicator.HIGH;
        }

        return StockIndicator.NORMAL;
    }

    public async createInventory(payload: TInventory) {
        const isExists = await this._repo.findOne({
            where: {
                expiration: payload.expiration?.toString(),
                productId: payload.productId,
            },
        });
        if (isExists) {
            throw new ResourceConflictError('Product already exists.');
        }

        payload.stockIndicator = this.getStockIndicator(payload.stock);
        payload.expiration = payload.expiration
            ? moment(payload.expiration).tz('Asia/Manila').toISOString()
            : '';
        const inventory = await this._repo.create(payload);
        return inventory;
    }

    public async getInventory(id: string) {
        if (!id) throw new BadRequestError('Missing id params.');

        const inventory = await this._repo.findOne({
            where: { id },
            include: { products: true },
        });
        if (!inventory) throw new NotFoundError('Inventory does not exist');
        return inventory;
    }

    public async getInventories(query: TInventoryList) {
        return await this._repo.list(query);
    }
}

export default InventoryService;
