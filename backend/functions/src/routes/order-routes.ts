import { Router } from 'express';
import JoiMiddleware from '../middleware/joi-middleware';
import AuthMiddleware from '../middleware/auth-middleware';
import { OrderController } from '../controller';
import { createOrderSchema } from '../lib/joi-schemas/order-schema';
const router = Router();
const joi = new JoiMiddleware();
const authMiddleware = new AuthMiddleware();

router.post(
    '/',
    joi.requestSchemaValidate(createOrderSchema),
    authMiddleware.endUserValidate as any,
    OrderController.createOrder
);

export default router;
