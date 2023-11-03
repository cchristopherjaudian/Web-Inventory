import Joi from 'joi';

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
        }).default({}),
    }),
};

export { createProfileSchema, updateProfileSchema };
