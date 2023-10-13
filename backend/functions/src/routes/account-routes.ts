import { Router } from 'express';
import {
    AccountController,
    AdminController,
    B2bController,
    B2cController,
} from '../controller';
import JoiMiddleware from '../middleware/joi-middleware';
import {
    registerSchema,
    getB2cListSchema,
} from '../lib/joi-schemas/account-schema';
import AuthMiddleware from '../middleware/auth-middleware';
import Prisma from '../lib/prisma';

const db = Prisma.Instance.db;
const router = Router();
const joi = new JoiMiddleware();
const authMiddleware = new AuthMiddleware(db);

router.post(
    '/',
    joi.requestSchemaValidate(registerSchema),
    AccountController.register
);

// ADMIN ROUTES
router.get(
    '/admins',
    joi.requestSchemaValidate(getB2cListSchema),
    authMiddleware.adminValidate(['ADMIN']) as any,
    AdminController.getAdminList
);

// CUSTOMERS ROUTES
router.get(
    '/b2c',
    joi.requestSchemaValidate(getB2cListSchema),
    authMiddleware.adminValidate(['ADMIN']) as any,
    B2cController.getb2cList
);

// Bussiness ROUTES
router.get(
    '/b2b',
    joi.requestSchemaValidate(getB2cListSchema),
    authMiddleware.adminValidate(['ADMIN']) as any,
    B2bController.getb2cList
);

export default router;
