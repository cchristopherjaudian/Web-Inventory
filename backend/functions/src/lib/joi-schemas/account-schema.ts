import Joi from 'joi';
import { AccountStatuses } from '@prisma/client';
import { AccountTypes } from '../types/accounts-types';

const registerSchema = {
    body: Joi.object({
        username: Joi.string().min(11).max(11).trim().required(),
        password: Joi.string()
            .pattern(/^[A-Z]/, 'Password should start with a capital letter')
            .pattern(
                /(?=.*\d)/,
                'Password should contain atleast contain 1 numeric value'
            )
            .pattern(
                /(?=.*[@#$!%*?&])/,
                'Password should atleast contain 1 special character'
            )
            .pattern(
                /[A-Za-z\d@$!%*?&]{7,}/,
                'Password should be 8 characters length'
            )
            .trim()
            .required(),
        accountType: Joi.string()
            .trim()
            .valid(...Object.values(AccountTypes))
            .required(),
    }),
};

const forgotPasswordSchema = {
    body: Joi.object({
        username: Joi.string().min(11).max(11).trim().required(),
        password: Joi.string()
            .pattern(/^[A-Z]/, 'Password should start with a capital letter')
            .pattern(
                /(?=.*\d)/,
                'Password should contain atleast contain 1 numeric value'
            )
            .pattern(
                /(?=.*[@#$!%*?&])/,
                'Password should atleast contain 1 special character'
            )
            .pattern(
                /[A-Za-z\d@$!%*?&]{7,}/,
                'Password should be 8 characters length'
            )
            .trim()
            .required(),
    }),
};

const loginSchema = {
    body: Joi.object({
        username: Joi.string().min(11).max(11).trim().required(),
        password: Joi.string().trim().required(),
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

export { registerSchema, getB2cListSchema, loginSchema, forgotPasswordSchema };
