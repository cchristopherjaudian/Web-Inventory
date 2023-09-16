import { Router } from 'express';
import JoiMiddleware from '../middleware/joi-middleware';
import AuthMiddleware from '../middleware/auth-middleware';
import { ProductController } from '../controller';
import {
  createProductSchema,
  productListQuery,
  updateProductSchema,
} from '../lib/joi-schemas/product-schema';

const router = Router();
const joi = new JoiMiddleware();
const authMiddleware = new AuthMiddleware();

router
  .post(
    '/',
    joi.requestSchemaValidate(createProductSchema),
    authMiddleware.adminValidate(['ADMIN']) as any,
    ProductController.createProduct
  )
  .get(
    '/:productId',
    authMiddleware.endUserValidate as any,
    ProductController.getProduct
  )
  .get(
    '/',
    joi.requestSchemaValidate(productListQuery),
    authMiddleware.endUserValidate as any,
    ProductController.getProductList
  )
  .patch(
    '/:productId',
    joi.requestSchemaValidate(updateProductSchema),
    authMiddleware.endUserValidate as any,
    ProductController.updateProduct
  );

export default router;
