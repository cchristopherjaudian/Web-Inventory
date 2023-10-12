import Joi from 'joi';

const createProductSchema = {
    body: Joi.object({
        name: Joi.string().trim().required(),
        code: Joi.string().trim().required(),
        size: Joi.string().trim().optional(),
        category: Joi.string().trim().required(),
        price: Joi.number().precision(2).required(),
        content: Joi.number().precision(2).optional(),
    }),
};

const updateProductSchema = {
    body: Joi.object({
        name: Joi.string().trim().optional(),
        code: Joi.string().trim().optional(),
        size: Joi.string().trim().optional(),
        category: Joi.string().trim().optional(),
        price: Joi.number().precision(2).optional(),
        content: Joi.number().precision(2).optional(),
    }),
};

const productListQuery = {
    query: Joi.object({
        search: Joi.string().trim().optional(),
    }),
};

export { createProductSchema, updateProductSchema, productListQuery };
