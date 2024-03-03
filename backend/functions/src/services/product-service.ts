import { TProducts, TProductsQuery } from '../lib/types/product-types';
import {
  NotFoundError,
  ResourceConflictError,
} from '../lib/custom-errors/class-errors';
import { PaymentStatuses } from '@prisma/client';
import moment from 'moment-timezone';
import { TPrismaClient } from '../lib/prisma';

class ProductsService {
  private _db: TPrismaClient;

  constructor(db: TPrismaClient) {
    this._db = db;
  }

  public async productList(params: TProductsQuery) {
    const endsAt = moment().endOf('day').toDate();
    const startsAt = moment().startOf('day').subtract(7, 'days').toDate();

    const uniqueIds = await this._db.orderItems.groupBy({
      by: ['productId'],
      _sum: {
        quantity: true,
      },
      where: {
        orders: {
          status: PaymentStatuses.PAID,
        },
        AND: [{ createdAt: { lte: endsAt } }, { createdAt: { gte: startsAt } }],
      },
    });

    const featuredIds = uniqueIds
      .filter(
        (id) => id._sum.quantity! >= Number(process.env.TOP_SELLING_THRESHOLD)
      )
      .map((id) => id.productId);

    const [featured, products] = await this._db.$transaction([
      this._db.products.findMany({
        where: {
          id: {
            in: featuredIds as [],
          },
        },
      }),
      this._db.products.findMany({
        include: {
          ProductThreshold: true,
        },
        where: { name: { search: params.search as string } },
      }),
    ]);

    return {
      featured,
      products,
    };
  }

  public async createProduct(payload: TProducts) {
    const isExists = await this.findProduct({ code: payload.code });
    if (isExists) {
      throw new ResourceConflictError('Product already exists.');
    }
    const product = await this._db.products.create({
      data: payload as TProducts,
    });
    return product;
  }

  public async getProductByCategory(id: string) {
    const product = await this._db.products.findUnique({ where: { id } });
    if (!product) throw new NotFoundError('Product does not exists.');

    const groupedProduct = await this._db.inventory.groupBy({
      _sum: {
        stock: true,
      },
      by: ['productId'],
      where: {
        productId: product.id,
      },
    });

    const list = await this._db.products.findMany({
      where: { category: product.category, NOT: [{ id: product.id }] },
    });

    return {
      product,
      productInventories: groupedProduct,
      list,
    };
  }

  public async productInventories(id: string) {
    const product = await this._db.products.findUnique({ where: { id } });
    if (!product) throw new NotFoundError('Product does not exists.');

    const inventories = await this._db.inventory.findMany({
      where: { productId: product.id },
    });

    return {
      product,
      productInventories: inventories,
    };
  }

  public async findProduct(payload: Partial<TProducts & { id: string }>) {
    const product = await this._db.products.findFirst({
      where: payload,
    });
    return product;
  }

  public async update(id: string, payload: Partial<TProducts>) {
    let hasProducts;
    if (payload?.code) {
      hasProducts = await this.findProduct({ code: payload.code });
    }
    if (hasProducts) {
      throw new ResourceConflictError('Product already exists.');
    }

    return this._db.products.update({
      where: { id },
      data: {
        ...payload,
      },
    });
  }
}

export default ProductsService;
