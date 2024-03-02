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
      return this._db.productThreshold.create({
        data: payload,
      });
    }

    return this._db.productThreshold.update({
      where: { id: hasProduct.id },
      data: payload,
    });
  }
}

export default ProductThresholdService;
