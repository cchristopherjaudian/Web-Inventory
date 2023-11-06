import moment from 'moment-timezone';
import { TPrismaClient } from '../lib/prisma';
import { TCart } from '../lib/types/cart-types';
import {
    TCreatePr,
    TPurchaseList,
    TQuotationList,
} from '../lib/types/purchase-types';
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
        const rawPurchaseList = await this._db.cart.findMany({
            include: {
                products: true,
            },
            where: {
                profile: {
                    id: query.profileId,
                },
            },
        });

        const groupHistory = [] as string[];
        const output = [] as TQuotationList[];
        rawPurchaseList.forEach((purchase, index, purchases) => {
            if (!groupHistory.includes(purchase.groupNo as string)) {
                const sumTotal = purchases
                    .filter((pur) => pur.groupNo === purchase.groupNo)
                    .reduce(
                        (acc, curr) => {
                            acc.total =
                                acc.total +
                                parseInt(<any>curr.products?.price) *
                                    curr.quantity;

                            acc.qty = acc.qty + curr.quantity;
                            return acc;
                        },
                        { total: 0, qty: 0 }
                    );

                output?.push({
                    ...sumTotal,
                    group: purchase.groupNo as string,
                    dateRequested: purchase.dateRequested as Date,
                    dateRequired: purchase.dateRequired as Date,
                });
            }

            groupHistory.push(purchase.groupNo as string);
        });

        return output;
    }

    public async getPurchaseRequest(groupNo: string) {
        const [groupDetails, list] = await Promise.all([
            this._db.cart.findFirst({
                where: {
                    groupNo,
                },
            }),
            this._db.cart.findMany({
                select: {
                    id: true,
                    quantity: true,
                    products: {
                        select: {
                            id: true,
                            code: true,
                            name: true,
                            price: true,
                            photoUrl: true,
                        },
                    },
                },
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
