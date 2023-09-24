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

    public async addCart(
        payload: Omit<TCart, 'inventoryId'> & { code?: string }
    ) {
        try {
            const cartItem = { ...payload, inventoryId: null } as TCart & {
                code?: string;
            };
            const inventory = await this._db.inventory.findFirst({
                include: { products: true },
                where: {
                    products: {
                        code: payload.code,
                    },
                },
            });
            if (!inventory) {
                throw new NotFoundError('Inventory does not exists.');
            }

            const cart = await this._db.cart.findFirst({
                where: {
                    profileId: cartItem.profileId,
                    inventoryId: inventory?.id,
                },
            });

            if (inventory.stock < cartItem.quantity) {
                throw new BadRequestError(
                    'Insufficient stock for this inventory.'
                );
            }

            if (cart) {
                cart.quantity = cart.quantity + cartItem.quantity;
                return await this._db.cart.update({
                    where: { id: cart.id },
                    data: cart,
                });
            }

            if (cartItem?.code) {
                delete cartItem?.code;
            }
            cartItem.inventoryId = inventory.id;
            return await this._db.cart.create({ data: cartItem });
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
                    inventory: {
                        select: {
                            expiration: true,
                            id: true,
                            products: true,
                        },
                    },
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
                inventory: {
                    select: {
                        expiration: true,
                        id: true,
                        products: true,
                    },
                },
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
