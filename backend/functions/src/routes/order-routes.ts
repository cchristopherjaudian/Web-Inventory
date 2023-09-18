import { Router } from 'express';
import JoiMiddleware from '../middleware/joi-middleware';
import AuthMiddleware from '../middleware/auth-middleware';
import { OrderController } from '../controller';
import {
    createOrderSchema,
    createOrderStatusSchema,
    updateOrderSchema,
} from '../lib/joi-schemas/order-schema';
const router = Router();
const joi = new JoiMiddleware();
const authMiddleware = new AuthMiddleware();

router
    .post(
        '/',
        joi.requestSchemaValidate(createOrderSchema),
        authMiddleware.endUserValidate as any,
        OrderController.createOrder
    )
    .post(
        '/status',
        joi.requestSchemaValidate(createOrderStatusSchema),
        authMiddleware.adminValidate(['ADMIN', 'SUB_1']) as any,
        OrderController.createOrderStatus
    )
    .patch(
        '/:orderId',
        joi.requestSchemaValidate(updateOrderSchema),
        authMiddleware.adminValidate(['ADMIN', 'SUB_1']) as any,
        OrderController.updateOrder
    )
    .get(
        '/',
        // joi.requestSchemaValidate(updateOrderSchema),
        authMiddleware.endUserValidate as any,
        OrderController.listOrders
    );

export default router;
