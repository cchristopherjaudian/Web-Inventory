import ProductsRepository from '../repositories/products-repository';
import { TProducts, TProductsQuery } from '../lib/types/product-types';
import { ResourceConflictError } from '../lib/custom-errors/class-errors';

class ProductsService {
  private _repo = new ProductsRepository();

  public async productList(query: TProductsQuery) {
    return await this._repo.list(query);
  }

  public async createProduct(payload: TProducts) {
    const isExists = await this.findProduct({ code: payload.code });
    if (isExists) throw new ResourceConflictError('Product already exists.');
    const product = await this._repo.create(payload);
    return product;
  }

  public async findProduct(payload: Partial<TProducts & { id: string }>) {
    const product = await this._repo.findOne(payload);
    return product;
  }

  public async update(payload: Partial<TProducts>) {
    let hasProducts;
    if (payload?.code) {
      hasProducts = await this.findProduct({ code: payload.code });
    }
    if (hasProducts) throw new ResourceConflictError('Product already exists.');

    const product = await this._repo.update(payload);
    return product;
  }
}

export default ProductsService;
