import moment from 'moment-timezone';
import { TPrismaClient } from '../lib/prisma';
import { TCart } from '../lib/types/cart-types';
import { TCreatePr, TPurchaseList } from '../lib/types/purchase-types';
import CartService from './cart-service';
import { BadRequestError } from '../lib/custom-errors/class-errors';

class PurchaseService {
    private _db: TPrismaClient;
    private _cart: CartService;

    constructor(db: TPrismaClient) {
        this._db = db;
    }

    public async createPurchaseRequest(payload: TCreatePr) {
        console.log('payload.profileId', payload.profileId);
        const prCount = await this._db.cart.groupBy({
            by: ['groupNo'],
            where: {
                AND: [
                    {
                        createdAt: {
                            lte: moment()
                                .endOf('day')
                                .tz('Asia/Manila')
                                .toDate(),
                        },
                    },
                    {
                        createdAt: {
                            gte: moment()
                                .startOf('day')
                                .tz('Asia/Manila')
                                .toDate(),
                        },
                    },
                ],
                profile: {
                    id: payload.profileId,
                },
            },
        });
        if (prCount.length >= Number(process.env.MAX_PR)) {
            throw new BadRequestError(
                'You reached the maximum request for today.'
            );
        }

        this._cart = new CartService(this._db);
        const newDate = new Date();
        return Promise.all(
            payload.products.map(async (product) => {
                product.profileId = payload.profileId;
                product.createdAt = newDate;
                return this._cart.addCart(product as TCart);
            })
        );
    }

    public async getPurchaseList(query: TPurchaseList) {
        return this._db.cart.groupBy({
            by: ['groupNo', 'createdAt'],
            where: {
                profile: {
                    id: query.profileId,
                },
            },
        });
    }
}

export default PurchaseService;
