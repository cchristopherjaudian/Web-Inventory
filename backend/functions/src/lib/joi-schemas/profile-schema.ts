import Joi from 'joi';
import { AccountTypes } from '../types/accounts-types';

const createProfileSchema = {
    body: Joi.object({
        firstname: Joi.string().trim().required(),
        lastname: Joi.string().trim().required(),
        address: Joi.string().trim().required(),
        emailAddress: Joi.string().email().trim().required(),
        businessName: Joi.string().trim().optional(),
        photoUrl: Joi.string().trim().optional(),
        middlename: Joi.string().trim().optional(),
    }),
};

const createFullProfileSchema = {
    body: Joi.object({
        firstname: Joi.string().trim().required(),
        lastname: Joi.string().trim().required(),
        address: Joi.string().trim().required(),
        emailAddress: Joi.string().email().trim().required(),
        businessName: Joi.string().trim().optional(),
        photoUrl: Joi.string().trim().optional(),
        middlename: Joi.string().trim().optional(),
        account: Joi.object({
            username: Joi.string().min(11).max(11).trim().required(),
            password: Joi.string()
                .pattern(
                    /^[A-Z]/,
                    'Password should start with a capital letter'
                )
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
    }),
};

const checkExistingSchema = {
    query: Joi.object({
        email: Joi.string().required(),
        username: Joi.string().required(),
    }),
};

const updateProfileSchema = {
    body: Joi.object({
        firstname: Joi.string().trim().optional(),
        lastname: Joi.string().trim().optional(),
        emailAddress: Joi.string().email().trim().optional(),
        address: Joi.string().trim().optional(),
        businessName: Joi.string().trim().optional(),
        middlename: Joi.string().trim().optional(),
        photoUrl: Joi.string().trim().optional(),
        account: Joi.object({
            username: Joi.string().min(11).max(11).trim().optional(),
            password: Joi.string()
                .pattern(
                    /^[A-Z]/,
                    'Password should start with a capital letter'
                )
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
                .optional(),
        }).default({}),
    }),
};

export {
    createProfileSchema,
    updateProfileSchema,
    createFullProfileSchema,
    checkExistingSchema,
};
