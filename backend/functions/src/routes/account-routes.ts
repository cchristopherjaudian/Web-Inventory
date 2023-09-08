import { Router } from 'express';
import { AccountController } from '../controller';
import JoiMiddleware from '../middleware/joi-middleware';
import { registerSchema, loginSchema } from '../lib/joi-schemas/account-schema';

const router = Router();
const joi = new JoiMiddleware();

router.post(
  '/',
  joi.requestSchemaValidate(registerSchema),
  AccountController.register
);

export default router;
