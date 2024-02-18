import { Prisma } from '@prisma/client';
import { TPrismaClient } from '../lib/prisma';
import {
  TCreatePricesMany,
  TUpdatePrices,
} from '../lib/types/custom-prices-types';

class CustomPricesService {
  private _db: TPrismaClient;

  constructor(db: TPrismaClient) {
    this._db = db;
  }

  public async createPrice(payload: TCreatePricesMany) {
    return this._db.prCustomPrices.createMany({ data: payload.pr });
  }

  public async updatePrice(payload: TUpdatePrices) {
    return Promise.all(
      payload.pr.map(async (pr) => {
        return this._db.prCustomPrices.update({
          data: {
            price: new Prisma.Decimal(pr.price!),
          },
          where: { id: pr.id },
        });
      })
    );
  }
}

export default CustomPricesService;
