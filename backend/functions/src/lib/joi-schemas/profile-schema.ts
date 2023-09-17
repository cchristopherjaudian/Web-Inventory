import Joi from 'joi';
import { AccountTypes } from '@prisma/client';

const createProfileSchema = {
    body: Joi.object({
        firstname: Joi.string().trim().required(),
        lastname: Joi.string().trim().required(),
        address: Joi.string().trim().required(),
        middlename: Joi.string().trim().optional(),
        account: Joi.object({
            accountType: Joi.string()
                .valid(...Object.values(AccountTypes))
                .optional(),
        }),
    }),
};

const updateProfileSchema = {
    body: Joi.object({
        firstname: Joi.string().trim().optional(),
        lastname: Joi.string().trim().optional(),
        address: Joi.string().trim().optional(),
        middlename: Joi.string().trim().optional(),
        account: Joi.object({
            email: Joi.string().email().trim().optional(),
            accountType: Joi.string()
                .valid(...Object.values(AccountTypes))
                .optional(),
        }),
    }),
};

export { createProfileSchema, updateProfileSchema };
