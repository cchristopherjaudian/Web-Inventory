import moment from 'moment-timezone';
import { v4 as uuidV4 } from 'uuid';
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
  private readonly _db: TPrismaClient;

  constructor(db: TPrismaClient) {
    this._db = db;
  }

  public async createPurchaseRequest(payload: TCreatePr) {
    const totalQty = payload.products.reduce(
      (acc, curr) => curr.quantity + acc,
      0
    );
    if (totalQty < parseInt(process.env.MIN_PR_ITEMS as string)) {
      throw new BadRequestError(
        `Total quantity of PR should be a minimum of ${process.env.MIN_PR_ITEMS}`
      );
    }

    const prCount = await this._db.cart.groupBy({
      by: ['groupNo'],
      where: {
        AND: [
          {
            createdAt: {
              lte: moment().endOf('day').tz('Asia/Manila').toDate(),
            },
          },
          {
            createdAt: {
              gte: moment().startOf('day').tz('Asia/Manila').toDate(),
            },
          },
        ],
        profile: {
          id: payload.profileId,
        },
      },
    });

    if (prCount.length >= Number(process.env.MAX_PR)) {
      throw new BadRequestError('You reached the maximum request for today.');
    }

    await Promise.all(
      payload.products.map(async (product) => {
        const inventory = await this._db.inventory.findFirst({
          where: {
            products: {
              code: product.code,
            },
          },
          include: {
            products: true,
          },
        });

        if (!inventory || inventory?.stock < product.quantity) {
          throw new BadRequestError(
            `Insufficient stock ${inventory?.products?.code || product.code}.`
          );
        }
      })
    );

    const cart = new CartService(this._db);
    const newDate = new Date();
    return Promise.all(
      payload.products.map(async (product) => {
        product.profileId = payload.profileId;
        product.createdAt = newDate;

        return cart.addCart(product as TCart);
      })
    );
  }

  public async getPurchaseList(query: TPurchaseList) {
    const rawPurchaseList = await this._db.cart.findMany({
      include: {
        products: true,
        PrCustomPrices: true,
      },
      where: {
        profile: {
          id: query.profileId,
        },
        NOT: [
          {
            PrCustomPrices: null,
          },
        ],
      },
      orderBy: [{ createdAt: 'desc' }],
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
                parseInt(<any>curr.PrCustomPrices?.price) * curr.quantity;

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
          PrCustomPrices: true,
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
