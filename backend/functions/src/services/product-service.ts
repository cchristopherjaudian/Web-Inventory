import { TProducts, TProductsQuery } from '../lib/types/product-types';
import { ResourceConflictError } from '../lib/custom-errors/class-errors';
import { PrismaClient } from '@prisma/client';

class ProductsService {
    private _db: PrismaClient;

    constructor(db: PrismaClient) {
        this._db = db;
    }

    public async productList(params: TProductsQuery) {
        const query = { where: {} } as { where: { [key: string]: any } };

        if (params?.search && params?.searchField) {
            query.where = {
                [params.searchField]: {
                    contains: params.search,
                },
            };
        }

        if (params?.where && params?.whereField) {
            query.where[params.whereField] = params.where;
        }

        return await this._db.products.findMany(query);
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

        return await this._db.products.update({
            where: { id },
            data: {
                ...payload,
            },
        });
    }
}

export default ProductsService;
