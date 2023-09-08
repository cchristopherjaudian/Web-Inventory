import { Router } from 'express';
import { ProfileController } from '../controller';
import JoiMiddleware from '../middleware/joi-middleware';
import { createProfileSchema } from '../lib/joi-schemas/profile-schema';
import TokenMiddleware from '../middleware/auth-middleware';

const router = Router();
const joi = new JoiMiddleware();
const tokenValidation = new TokenMiddleware();

router
  .post(
    '/',
    joi.requestSchemaValidate(createProfileSchema),
    tokenValidation.endUserValidate as any,
    ProfileController.create
  )
  .get(
    '/auth',
    tokenValidation.endUserValidate as any,
    ProfileController.getProfile
  );

export default router;
