import { Router } from 'express';
import JoiMiddleware from '../middleware/joi-middleware';
import AuthMiddleware from '../middleware/auth-middleware';
import {
    createScheduleSchema,
    listSchedulesSchema,
    updateScheduleSchema,
} from '../lib/joi-schemas/schedule-schema';
import { ScheduleController } from '../controller';
import Prisma from '../lib/prisma';

const db = Prisma.Instance.db;
const router = Router();
const joi = new JoiMiddleware();
const authMiddleware = new AuthMiddleware(db);

router
    .post(
        '/',
        joi.requestSchemaValidate(createScheduleSchema),
        authMiddleware.adminValidate(['ADMIN']) as any,
        ScheduleController.createSchedule
    )
    .get(
        '/',
        joi.requestSchemaValidate(listSchedulesSchema),
        authMiddleware.adminValidate(['ADMIN', 'BUSINESS']) as any,
        ScheduleController.schedules
    )
    .patch(
        '/:scheduleId',
        joi.requestSchemaValidate(updateScheduleSchema),
        authMiddleware.adminValidate(['ADMIN']) as any,
        ScheduleController.updateSchedule
    );

export default router;
