import Joi from 'joi';

const createProfileSchema = {
    body: Joi.object({
        firstname: Joi.string().trim().required(),
        lastname: Joi.string().trim().required(),
        address: Joi.string().trim().required(),
        businessName: Joi.string().trim().optional(),
        middlename: Joi.string().trim().optional(),
    }),
};

const updateProfileSchema = {
    body: Joi.object({
        firstname: Joi.string().trim().optional(),
        lastname: Joi.string().trim().optional(),
        address: Joi.string().trim().optional(),
        businessName: Joi.string().trim().optional(),
        middlename: Joi.string().trim().optional(),
    }),
};

export { createProfileSchema, updateProfileSchema };
