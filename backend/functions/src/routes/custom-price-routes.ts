import { Router } from 'express';
import JoiMiddleware from '../middleware/joi-middleware';
import AuthMiddleware from '../middleware/auth-middleware';
import { CustomPriceController } from '../controller';
import Prisma from '../lib/prisma';
import {
  createPriceSchema,
  updatePriceSchema,
} from '../lib/joi-schemas/custom-price-schema';

const db = Prisma.Instance.db;
const router = Router();
const joi = new JoiMiddleware();
const authMiddleware = new AuthMiddleware(db);

router
  .patch(
    '/purchase-request',
    joi.requestSchemaValidate(updatePriceSchema),
    authMiddleware.endUserValidate as any,
    CustomPriceController.updatePrice
  )
  .post(
    '/purchase-request',
    joi.requestSchemaValidate(createPriceSchema),
    authMiddleware.endUserValidate as any,
    CustomPriceController.createPrice
  );

export default router;
