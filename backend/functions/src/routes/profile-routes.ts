import { Router } from 'express';
import { ProfileController } from '../controller';
import JoiMiddleware from '../middleware/joi-middleware';
import {
  createProfileSchema,
  updateProfileSchema,
} from '../lib/joi-schemas/profile-schema';
import AuthMiddleware from '../middleware/auth-middleware';
import profileController from '../controller/profile-controller';

const router = Router();
const joi = new JoiMiddleware();
const authMiddleware = new AuthMiddleware();

router
  .post(
    '/',
    joi.requestSchemaValidate(createProfileSchema),
    authMiddleware.endUserValidate as any,
    ProfileController.create
  )
  .get(
    '/auth',
    authMiddleware.endUserValidate as any,
    ProfileController.getProfile
  )
  .patch(
    '/auth',
    joi.requestSchemaValidate(updateProfileSchema),
    authMiddleware.endUserValidate as any,
    profileController.updateProfile
  );

export default router;
