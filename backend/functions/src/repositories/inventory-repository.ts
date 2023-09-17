import { TQueryArgs } from '../..';
import Prisma from '../lib/prisma';
import { TInventory, TInventoryList } from '../lib/types/inventory-types';

class InventoryRepository {
    private _db = Prisma.Instance.db;

    public async create(payload: TInventory) {
        try {
            return await this._db.inventory.create({ data: payload });
        } catch (error) {
            throw error;
        } finally {
            this._db.$disconnect();
        }
    }

    public async findOne(query: TQueryArgs) {
        try {
            const inventory = await this._db.inventory.findFirst(query);
            return inventory;
        } catch (error) {
            console.log('inventory', error);
            throw error;
        } finally {
            await this._db.$disconnect();
        }
    }

    public async list(query: TInventoryList) {
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
            console.log('inventory', error);
            throw error;
        } finally {
            await this._db.$disconnect();
        }
    }

    public async rawQueryList(query: TQueryArgs) {
        return this._db.inventory.findMany(query);
    }

    public async update(id: string, payload: Partial<TInventory>) {
        try {
            const inventory = await this._db.inventory.update({
                where: { id },
                data: payload,
            });
            return inventory;
        } catch (error) {
            console.log('inventory', error);
            throw error;
        } finally {
            await this._db.$disconnect();
        }
    }
}

export default InventoryRepository;
