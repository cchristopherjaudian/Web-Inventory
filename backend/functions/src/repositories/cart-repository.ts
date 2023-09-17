import { TQueryArgs } from '../..';
import Prisma from '../lib/prisma';
import { TCart, TCartList } from '../lib/types/cart-types';

class CartRepository {
    private _db = Prisma.Instance.db;

    public async create(payload: TCart) {
        try {
            return this._db.cart.create({ data: payload });
        } catch (error) {
            throw error;
        } finally {
            await this._db.$disconnect();
        }
    }

    public async update(id: string, payload: Partial<TCart>) {
        try {
            const cart = await this._db.cart.update({
                where: { id },
                data: payload,
            });
            return cart;
        } catch (error) {
            throw error;
        } finally {
            await this._db.$disconnect();
        }
    }

    public async list(params: TCartList) {
        try {
            const query = {
                where: { accountId: params.accountId },
                include: {
                    inventory: {
                        include: {
                            products: true,
                        },
                    },
                },
            } as TQueryArgs;

            return await this._db.cart.findMany(query);
        } catch (error) {
            throw error;
        } finally {
            await this._db.$disconnect();
        }
    }

    public async delete(id: string) {
        try {
            return await this._db.cart.delete({ where: { id } });
        } catch (error) {
            throw error;
        } finally {
            await this._db.$disconnect();
        }
    }

    public async findOne(query: TQueryArgs) {
        try {
            const cart = await this._db.cart.findFirst(query);
            return cart || null;
        } catch (error) {
            throw error;
        } finally {
            await this._db.$disconnect();
        }
    }
}

export default CartRepository;
