import Joi from 'joi';

const addCartSchema = {
    body: Joi.object({
        code: Joi.string().trim().required(),
        quantity: Joi.number().greater(0).required(),
    }),
};

export { addCartSchema };
