import { Router } from 'express';
import JoiMiddleware from '../middleware/joi-middleware';
import AuthMiddleware from '../middleware/auth-middleware';
import { CartController } from '../controller';
import { addCartSchema } from '../lib/joi-schemas/cart-schema';
const router = Router();
const joi = new JoiMiddleware();
const authMiddleware = new AuthMiddleware();

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
    .delete(
        '/:cartId',
        authMiddleware.endUserValidate as any,
        CartController.deleteCartItem
    );

export default router;
