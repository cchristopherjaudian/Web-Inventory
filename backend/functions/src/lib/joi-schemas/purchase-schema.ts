import Joi from 'joi';

const createPurchaseSchema = {
    body: Joi.object({
        cart: Joi.array().items(
            Joi.object({
                code: Joi.string().trim().required(),
                quantity: Joi.number().greater(0).required(),
                groupNo: Joi.string().trim().required(),
            })
        ),
    }),
};

export { createPurchaseSchema };
