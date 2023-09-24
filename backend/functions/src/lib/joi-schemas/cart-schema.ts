import Joi from 'joi';

const addCartSchema = {
    body: Joi.object({
        code: Joi.string().trim().required(),
        quantity: Joi.number().greater(0).required(),
    }),
};

const updateCartSchema = {
    body: Joi.object({
        quantity: Joi.number().greater(0).optional(),
        saved: Joi.boolean().optional(),
    }),
};

export { addCartSchema, updateCartSchema };
