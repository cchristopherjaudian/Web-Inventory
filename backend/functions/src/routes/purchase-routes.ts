import { Router } from 'express';
import { PurchaseController } from '../controller';
import JoiMiddleware from '../middleware/joi-middleware';

import AuthMiddleware from '../middleware/auth-middleware';
import Prisma from '../lib/prisma';
import { createPurchaseSchema } from '../lib/joi-schemas/purchase-schema';

const db = Prisma.Instance.db;
const router = Router();
const joi = new JoiMiddleware();
const authMiddleware = new AuthMiddleware(db);

router.post(
    '/',
    authMiddleware.endUserValidate as any,
    joi.requestSchemaValidate(createPurchaseSchema),
    PurchaseController.createPurchase
);

router.get(
    '/',
    authMiddleware.endUserValidate as any,
    joi.requestSchemaValidate(createPurchaseSchema),
    PurchaseController.getPurchaseList
);

router.get(
    '/:groupNo',
    authMiddleware.endUserValidate as any,
    PurchaseController.getPurchaseRequest
);

export default router;
