import { Router } from 'express';
import {
  AccountController,
  AdminController,
  CustomerController,
} from '../controller';
import JoiMiddleware from '../middleware/joi-middleware';
import {
  registerSchema,
  getCustomersSchema,
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
  joi.requestSchemaValidate(getCustomersSchema),
  authMiddleware.adminValidate(['ADMIN']) as any,
  CustomerController.getCustomersList
);

export default router;
