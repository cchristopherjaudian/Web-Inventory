import { NotFoundError } from '../lib/custom-errors/class-errors';
import Prisma from '../lib/prisma';
import { TProducts } from '../lib/types/product-types';

class ProductsRepository {
  private _db = Prisma.Instance.db;

  public async create(payload: TProducts) {
    try {
      const products = await this._db.products.create({
        data: {
          ...payload,
        } as any,
      });
      return products;
    } catch (error) {
      throw error;
    } finally {
      await this._db.$disconnect();
    }
  }

  public async findOne(payload: Record<string, any>) {
    try {
      const account = await this._db.products.findFirst({
        where: payload,
      });
      return account;
    } catch (error) {
      throw error;
    } finally {
      await this._db.$disconnect();
    }
  }

  public async update(payload: Partial<TProducts & { id: string }>) {
    try {
      const products = await this._db.products.update({
        where: { id: payload?.id },
        data: {
          ...payload,
        },
      });
      return products;
    } catch (error) {
      throw error;
    } finally {
      await this._db.$disconnect();
    }
  }
}

export default ProductsRepository;
