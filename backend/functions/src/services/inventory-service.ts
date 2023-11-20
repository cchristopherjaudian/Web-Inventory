import moment from 'moment-timezone';
import { TInventory, TInventoryList } from '../lib/types/inventory-types';
import {
    BadRequestError,
    NotFoundError,
} from '../lib/custom-errors/class-errors';
import { TQueryArgs } from '../../index';
import { getStockIndicator } from '../helpers/stock-indicator';
import { TPrismaClient } from '../lib/prisma';

class InventoryService {
    private _db: TPrismaClient;

    constructor(db: TPrismaClient) {
        this._db = db;
    }

    public async createInventory(payload: TInventory) {
        const isExists = await this._db.inventory.findFirst({
            where: {
                expiration: payload.expiration,
                productId: payload.productId,
            },
        });
        if (isExists) {
            isExists.stock = isExists.stock + payload.stock;

            payload.stockIndicator = getStockIndicator(isExists.stock);

            return this._db.inventory.update({
                where: {
                    id: isExists.id,
                },

                data: {
                    ...isExists,
                },
            });
        }

        payload.stockIndicator = getStockIndicator(payload.stock);
        payload.expiration = payload.expiration
            ? moment(payload.expiration).tz('Asia/Manila').toDate()
            : null;

        return this._db.inventory.create({ data: payload });
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

            return this._db.inventory.findMany(params);
        } catch (error) {
            throw error;
        }
    }

    public async updateInventory(id: string, payload: Partial<TInventory>) {
        await this.getInventory(id);

        if (payload?.stock) {
            payload.stockIndicator = getStockIndicator(payload.stock);
        }
        return this._db.inventory.update({
            where: { id },
            data: payload,
        });
    }

    public async deleteInventory(id: string) {
        return this._db.inventory.delete({ where: { id } });
    }
}

export default InventoryService;
