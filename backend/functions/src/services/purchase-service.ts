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
            _sum: {
                quantity: true,
            },
            by: ['groupNo', 'createdAt', 'dateRequested', 'dateRequired'],
            where: {
                profile: {
                    id: query.profileId,
                },
            },
        });
    }

    public async getPurchaseRequest(groupNo: string) {
        const [groupDetails, list] = await Promise.all([
            this._db.cart.findFirst({
                where: {
                    groupNo,
                },
            }),
            this._db.cart.findMany({
                where: {
                    groupNo,
                },
            }),
        ]);

        return {
            groupNo,
            dateRequested: groupDetails?.dateRequested,
            dateRequired: groupDetails?.dateRequired,
            list,
        };
    }
}

export default PurchaseService;
