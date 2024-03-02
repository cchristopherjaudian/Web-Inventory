import { Router } from 'express';
import JoiMiddleware from '../middleware/joi-middleware';
import AuthMiddleware from '../middleware/auth-middleware';
import { ProductThresholdController } from '../controller';
import Prisma from '../lib/prisma';
import { createThresholdSchema } from '../lib/joi-schemas/product-threshold-schema';

const db = Prisma.Instance.db;
const router = Router();
const joi = new JoiMiddleware();
const authMiddleware = new AuthMiddleware(db);

router.post(
  '/',
  joi.requestSchemaValidate(createThresholdSchema),
  authMiddleware.adminValidate(['ADMIN', 'SUB_1', 'SUB_2']) as any,
  ProductThresholdController.createThreshold
);

export default router;
