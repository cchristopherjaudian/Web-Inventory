import Joi from 'joi';
import { AccountStatuses } from '@prisma/client';

const registerSchema = {
    body: Joi.object({
        email: Joi.string().email().trim().required(),
    }),
};

const getB2cListSchema = {
    query: Joi.object({
        search: Joi.string().trim().optional(),
        status: Joi.string()
            .trim()
            .valid(...Object.values(AccountStatuses))
            .optional(),
    }),
};

export { registerSchema, getB2cListSchema };
