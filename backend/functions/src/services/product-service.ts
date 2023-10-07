import { TProducts, TProductsQuery } from '../lib/types/product-types';
import {
    NotFoundError,
    ResourceConflictError,
} from '../lib/custom-errors/class-errors';
import { PaymentStatuses, PrismaClient } from '@prisma/client';
import moment from 'moment-timezone';

class ProductsService {
    private _db: PrismaClient;

    constructor(db: PrismaClient) {
        this._db = db;
    }

    public async productList(params: TProductsQuery) {
        const endsAt = moment().endOf('day').toDate();
        const startsAt = moment().startOf('day').subtract(7, 'days').toDate();
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

        const uniqueIds = await this._db.orderItems.groupBy({
            by: ['productId'],
            _sum: {
                quantity: true,
            },
            where: {
                orders: {
                    status: PaymentStatuses.PAID,
                },
                AND: [
                    { createdAt: { lte: endsAt } },
                    { createdAt: { gte: startsAt } },
                ],
            },
        });

        const featuredIds = uniqueIds
            .filter(
                (id) =>
                    id._sum.quantity! >=
                    Number(process.env.TOP_SELLING_THRESHOLD)
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
            this._db.products.findMany(query),
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

    public async productInventories(id: string) {
        const product = await this._db.products.findUnique({ where: { id } });
        if (!product) throw new NotFoundError('Product does not exists.');

        const inventories = await this._db.inventory.findMany({
            where: { productId: product.id },
        });

        return {
            product,
            inventories,
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

        return await this._db.products.update({
            where: { id },
            data: {
                ...payload,
            },
        });
    }
}

export default ProductsService;
