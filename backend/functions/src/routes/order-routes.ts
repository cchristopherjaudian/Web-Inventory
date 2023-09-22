import { Router } from 'express';
import JoiMiddleware from '../middleware/joi-middleware';
import AuthMiddleware from '../middleware/auth-middleware';
import { OrderController } from '../controller';
import {
    createOrderSchema,
    createOrderStatusSchema,
    getOrderSalesSchema,
    updateOrderSchema,
} from '../lib/joi-schemas/order-schema';
import Prisma from '../lib/prisma';

const db = Prisma.Instance.db;
const router = Router();
const joi = new JoiMiddleware();
const authMiddleware = new AuthMiddleware(db);

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
    .get('/', authMiddleware.endUserValidate as any, OrderController.listOrders)
    .get(
        '/sales',
        joi.requestSchemaValidate(getOrderSalesSchema),
        authMiddleware.endUserValidate as any,
        OrderController.getSales
    );

export default router;
