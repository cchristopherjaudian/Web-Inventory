import { Router } from 'express';
import JoiMiddleware from '../middleware/joi-middleware';
import AuthMiddleware from '../middleware/auth-middleware';
import { MetricsController } from '../controller';
import Prisma from '../lib/prisma';
import {
  getMetricsSales,
  getRptSchema,
} from '../lib/joi-schemas/metrics-schema';

const db = Prisma.Instance.db;
const router = Router();
const joi = new JoiMiddleware();
const authMiddleware = new AuthMiddleware(db);

router
  .get(
    '/sales',
    joi.requestSchemaValidate(getMetricsSales),
    authMiddleware.adminValidate(['ADMIN', 'SUB_2']) as any,
    MetricsController.getSales
  )
  .get(
    '/panels',
    authMiddleware.adminValidate(['ADMIN', 'SUB_2', 'WH']) as any,
    MetricsController.getPanels
  )
  .get(
    '/reports',
    joi.requestSchemaValidate(getRptSchema),
    authMiddleware.adminValidate(['ADMIN', 'SUB_2']) as any,
    MetricsController.getReportsList
  );

export default router;
