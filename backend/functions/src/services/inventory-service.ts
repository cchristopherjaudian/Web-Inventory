import { PrismaClient, StockIndicator } from '@prisma/client';
import moment from 'moment-timezone';
import INVENTORY_CONSTANTS from '../../commons/inventory-contants';
import { TInventory, TInventoryList } from '../lib/types/inventory-types';
import {
    BadRequestError,
    NotFoundError,
    ResourceConflictError,
} from '../lib/custom-errors/class-errors';
import { TQueryArgs } from '../../index';

class InventoryService {
    private _db: PrismaClient;

    constructor(db: PrismaClient) {
        this._db = db;
    }

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
        const isExists = await this._db.inventory.findFirst({
            where: {
                expiration: payload.expiration,
                productId: payload.productId,
            },
        });
        if (isExists) {
            throw new ResourceConflictError('Product already exists.');
        }

        payload.stockIndicator = this.getStockIndicator(payload.stock);
        payload.expiration = payload.expiration
            ? moment(payload.expiration).tz('Asia/Manila').toDate()
            : null;

        return await this._db.inventory.create({ data: payload });
    }

    public async getInventory(id: string) {
        if (!id) throw new BadRequestError('Missing id params.');

        const inventory = await this._db.inventory.findFirst({
            where: { id },
            include: { products: true },
        });
        if (!inventory) throw new NotFoundError('Inventory does not exist');
        return inventory;
    }

    public async getInventories(query: TInventoryList) {
        try {
            const params = {
                // select: {},
                where: {},
                include: {
                    products: !query?.stock || !query?.search,
                },
            } as TQueryArgs;

            if (query?.stock) {
                params.where.stockIndicator = query.stock;
            }

            if (query?.search) {
                params.where.products = {
                    name: {
                        contains: query.search,
                        mode: 'insensitive', // Default value: default
                    },
                };
            }

            return await this._db.inventory.findMany(params);
        } catch (error) {
            throw error;
        }
    }

    public async updateInventory(id: string, payload: Partial<TInventory>) {
        await this.getInventory(id);

        if (payload?.stock) {
            payload.stockIndicator = this.getStockIndicator(payload.stock);
        }
        return await this._db.inventory.update({
            where: { id },
            data: payload,
        });
    }
}

export default InventoryService;
