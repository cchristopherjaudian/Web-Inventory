import { RouteStatuses } from '@prisma/client';
import Joi from 'joi';

const createScheduleSchema = {
  body: Joi.object({
    route: Joi.string().trim().required(),
    date: Joi.string().trim().optional(),
    time: Joi.string().trim().optional(),
    description: Joi.string().trim().required(),
    plateNumber: Joi.string().trim().required(),
    assigned: Joi.string().trim().required(),
  }),
};

const listSchedulesSchema = {
  query: Joi.object({
    status: Joi.string()
      .trim()
      .valid(...Object.values(RouteStatuses))
      .optional(),
  }),
};

const updateScheduleSchema = {
  body: Joi.object({
    route: Joi.string().trim().optional(),
    date: Joi.string().trim().optional(),
    time: Joi.string().trim().optional(),
    description: Joi.string().trim().optional(),
    plateNumber: Joi.string().trim().optional(),
    assigned: Joi.string().trim().optional(),
  }),
};

export { createScheduleSchema, listSchedulesSchema, updateScheduleSchema };
