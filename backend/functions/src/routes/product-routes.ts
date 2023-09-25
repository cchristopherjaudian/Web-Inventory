import { Router } from 'express';
import JoiMiddleware from '../middleware/joi-middleware';
import AuthMiddleware from '../middleware/auth-middleware';
import { ProductController } from '../controller';
import {
    createProductSchema,
    productListQuery,
    updateProductSchema,
} from '../lib/joi-schemas/product-schema';
import Prisma from '../lib/prisma';

const db = Prisma.Instance.db;
const router = Router();
const joi = new JoiMiddleware();
const authMiddleware = new AuthMiddleware(db);

router
    .post(
        '/',
        joi.requestSchemaValidate(createProductSchema),
        authMiddleware.adminValidate(['ADMIN', 'SUB_2']) as any,
        ProductController.createProduct
    )
    .get(
        '/:productId',
        authMiddleware.adminValidate([
            'ADMIN',
            'SUB_2',
            'BUSINESS',
            'CUSTOMER',
        ]) as any,
        ProductController.getProduct
    )
    .get(
        '/',
        joi.requestSchemaValidate(productListQuery),
        authMiddleware.adminValidate([
            'ADMIN',
            'SUB_2',
            'BUSINESS',
            'CUSTOMER',
        ]) as any,
        ProductController.getProductList
    )
    .patch(
        '/:productId',
        joi.requestSchemaValidate(updateProductSchema),
        authMiddleware.adminValidate(['ADMIN', 'SUB_2']) as any,
        ProductController.updateProduct
    );

export default router;
