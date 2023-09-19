import { TQueryArgs } from '../..';
import {
    BadRequestError,
    NotFoundError,
} from '../lib/custom-errors/class-errors';
import { TCart, TCartList } from '../lib/types/cart-types';
import CartRepository from '../repositories/cart-repository';
import InventoryService from './inventory-service';

class CartService {
    private _repo = new CartRepository();
    private _inv = new InventoryService();

    public async addCart(
        payload: Omit<TCart, 'inventoryId'> & { code?: string }
    ) {
        const cartItem = { ...payload, inventoryId: null } as TCart & {
            code?: string;
        };
        const inventory = await this._inv.invRepo.findOne({
            include: { products: true },
            where: {
                products: {
                    code: payload.code,
                },
            },
        });
        if (!inventory) throw new NotFoundError('Inventory does not exists.');

        const cart = await this._repo.findOne({
            where: {
                profileId: cartItem.profileId,
                inventoryId: inventory?.id,
            },
        });

        if (inventory.stock < cartItem.quantity) {
            throw new BadRequestError('Insufficient stock for this inventory.');
        }

        if (cart) {
            cart.quantity = cart.quantity + cartItem.quantity;
            return await this._repo.update(cart.id, cart);
        }

        if (cartItem?.code) {
            delete cartItem?.code;
        }
        cartItem.inventoryId = inventory.id;
        return await this._repo.create(cartItem);
    }

    public async getUserCart(query: TCartList) {
        const items = await this._repo.list(query);

        return items;
    }

    public async getCart(query: TQueryArgs) {
        const items = await this._repo.findOne(query);

        return items;
    }

    public async deleteCartItem(id: string) {
        return await this._repo.delete(id);
    }
}

export default CartService;
