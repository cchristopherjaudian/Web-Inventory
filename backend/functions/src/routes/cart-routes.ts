import { Router } from 'express';
import JoiMiddleware from '../middleware/joi-middleware';
import AuthMiddleware from '../middleware/auth-middleware';
import { CartController } from '../controller';
import {
    addCartSchema,
    updateCartSchema,
} from '../lib/joi-schemas/cart-schema';
import Prisma from '../lib/prisma';

const db = Prisma.Instance.db;
const router = Router();
const joi = new JoiMiddleware();
const authMiddleware = new AuthMiddleware(db);

router
    .post(
        '/',
        joi.requestSchemaValidate(addCartSchema),
        authMiddleware.endUserValidate as any,
        CartController.addCart
    )
    .get(
        '/auth',
        authMiddleware.endUserValidate as any,
        CartController.getUserCart
    )
    .get(
        '/:cartId',
        authMiddleware.endUserValidate as any,
        CartController.getCartItem
    )
    .patch(
        '/:cartId',
        joi.requestSchemaValidate(updateCartSchema),
        authMiddleware.endUserValidate as any,
        CartController.updateCart
    )
    .delete(
        '/:cartId',
        authMiddleware.endUserValidate as any,
        CartController.deleteCartItem
    );

export default router;
