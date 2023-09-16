import { Router } from 'express';
import {
    AccountController,
    AdminController,
    CustomerController,
} from '../controller';
import JoiMiddleware from '../middleware/joi-middleware';
import {
    registerSchema,
    getB2cListSchema,
} from '../lib/joi-schemas/account-schema';
import AuthMiddleware from '../middleware/auth-middleware';

const router = Router();
const joi = new JoiMiddleware();
const authMiddleware = new AuthMiddleware();

router.post(
    '/',
    joi.requestSchemaValidate(registerSchema),
    AccountController.register
);

// ADMIN ROUTES
router.get(
    '/admins',
    authMiddleware.adminValidate(['ADMIN']) as any,
    AdminController.getAdminList
);

// CUSTOMERS ROUTES
router.get(
    '/customers',
    joi.requestSchemaValidate(getB2cListSchema),
    authMiddleware.adminValidate(['ADMIN']) as any,
    CustomerController.getb2cList
);

export default router;
