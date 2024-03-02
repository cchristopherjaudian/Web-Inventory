import { StockIndicator } from '@prisma/client';
import { TPrismaClient } from '../lib/prisma';
import { TCreateThreshold } from '../lib/types/product-threshold';

class ProductThresholdService {
  private _db: TPrismaClient;

  constructor(db: TPrismaClient) {
    this._db = db;
  }

  public async createThreshold(payload: TCreateThreshold) {
    const hasProduct = await this._db.productThreshold.findFirst({
      where: { productId: payload.productId },
    });

    if (!hasProduct) {
      return Promise.all([
        this._db.productThreshold.create({
          data: payload,
        }),
        this.updateInventoryIndicators(payload.productId, payload.threshold),
      ]);
    }

    return Promise.all([
      this._db.productThreshold.update({
        where: { id: hasProduct.id },
        data: payload,
      }),
      this.updateInventoryIndicators(payload.productId, payload.threshold),
    ]);
  }

  private async updateInventoryIndicators(
    productId: string,
    threshold: number
  ) {
    const hasInventory = await this._db.inventory.aggregate({
      _count: true,
      where: {
        productId,
      },
    });

    if (hasInventory._count > 0) {
      return Promise.all([
        this._db.inventory.updateMany({
          where: {
            productId,
            stock: {
              gt: threshold,
            },
          },

          data: {
            stockIndicator: StockIndicator.HIGH,
          },
        }),
        this._db.inventory.updateMany({
          where: {
            productId,
            stock: {
              lt: threshold,
            },
          },

          data: {
            stockIndicator: StockIndicator.LOW,
          },
        }),

        this._db.inventory.updateMany({
          where: {
            productId,
            stock: threshold,
          },
          data: {
            stockIndicator: StockIndicator.NORMAL,
          },
        }),
      ]);
    }
  }
}

export default ProductThresholdService;
