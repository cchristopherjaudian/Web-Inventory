import { PrismaClient } from '@prisma/client';
import { TQueryArgs } from '../../index';
import {
    BadRequestError,
    NotFoundError,
} from '../lib/custom-errors/class-errors';
import { TCart, TCartList } from '../lib/types/cart-types';

class CartService {
    private _db: PrismaClient;

    constructor(db: PrismaClient) {
        this._db = db;
    }

    public async addCart(payload: TCart & { code?: string }) {
        try {
            const product = await this._db.products.findFirst({
                where: {
                    code: payload.code,
                },
            });
            if (!product) {
                throw new NotFoundError('Products does not exists.');
            }

            const cart = await this._db.cart.findFirst({
                where: {
                    profileId: payload.profileId,
                    productId: product?.id,
                },
            });

            const inventories = await this._db.inventory.findMany({
                where: {
                    productId: product.id,
                },
                orderBy: [
                    {
                        expiration: 'asc',
                    },
                ],
            });

            const stockTotal = inventories.reduce(
                (acc, curr) => acc + curr.stock,
                0
            );
            if (payload.quantity > stockTotal) {
                throw new BadRequestError('Insufficient stock.');
            }

            if (cart) {
                cart.quantity = cart.quantity + payload.quantity;
                return await this._db.cart.update({
                    where: { id: cart.id },
                    data: cart,
                });
            }

            if (payload?.code) {
                delete payload?.code;
            }
            payload.productId = product.id;
            return await this._db.cart.create({ data: payload });
        } catch (error) {
            throw error;
        }
    }

    public async getUserCart(params: TCartList) {
        try {
            const query = {
                where: { profileId: params.profileId },
                select: {
                    id: true,
                    quantity: true,
                    products: true,
                },
            } as TQueryArgs;

            return await this._db.cart.findMany(query);
        } catch (error) {
            throw error;
        }
    }

    public async getCartItem(id: string) {
        return await this._db.cart.findFirst({
            where: { id },
            select: {
                id: true,
                quantity: true,
                products: true,
            },
        });
    }

    public async updateCart(id: string, payload: Partial<TCart>) {
        const cart = await this.getCartItem(id);
        if (!cart) throw new NotFoundError('Cart item does not exists.');
        return await this._db.cart.update({ where: { id }, data: payload });
    }

    public async deleteCartItem(id: string) {
        return await this._db.cart.delete({ where: { id } });
    }
}

export default CartService;
