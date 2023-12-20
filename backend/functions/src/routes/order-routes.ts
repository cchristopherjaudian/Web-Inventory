import { Router } from 'express';
import JoiMiddleware from '../middleware/joi-middleware';
import AuthMiddleware from '../middleware/auth-middleware';
import { OrderController } from '../controller';
import {
  createOrderSchema,
  createOrderStatusSchema,
  updateOrderSchema,
} from '../lib/joi-schemas/order-schema';
import Prisma from '../lib/prisma';

const db = Prisma.Instance.db;
const router = Router();
const joi = new JoiMiddleware();
const authMiddleware = new AuthMiddleware(db as any);

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
    authMiddleware.endUserValidate as any,
    OrderController.updateOrder
  )
  .patch(
    '/cancellation/:orderId',
    authMiddleware.endUserValidate as any,
    OrderController.cancelOrder
  )
  .get(
    '/endusers',
    authMiddleware.endUserValidate as any,
    OrderController.endUserOrders
  )
  .get(
    '/admins',
    authMiddleware.adminValidate(['ADMIN', 'SUB_1']) as any,
    OrderController.adminOrders
  )
  .get(
    '/transactions',
    authMiddleware.adminValidate(['ADMIN', 'SUB_1']) as any,
    OrderController.getOrdersTxn
  )
  .get(
    '/:orderId',
    authMiddleware.endUserValidate as any,
    OrderController.getOrder
  );

export default router;
