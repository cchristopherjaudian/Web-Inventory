import { Router } from 'express';
import { ProfileController } from '../controller';
import JoiMiddleware from '../middleware/joi-middleware';
import {
    createFullProfileSchema,
    createProfileSchema,
    updateProfileSchema,
} from '../lib/joi-schemas/profile-schema';
import AuthMiddleware from '../middleware/auth-middleware';
import profileController from '../controller/profile-controller';
import Prisma from '../lib/prisma';

const db = Prisma.Instance.db;
const router = Router();
const joi = new JoiMiddleware();
const authMiddleware = new AuthMiddleware(db);

router
    .post(
        '/',
        joi.requestSchemaValidate(createProfileSchema),
        authMiddleware.inactiveValidate as any,
        ProfileController.create
    )
    .post(
        '/full',
        joi.requestSchemaValidate(createFullProfileSchema),
        authMiddleware.inactiveValidate as any,
        ProfileController.createFullProfile
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
