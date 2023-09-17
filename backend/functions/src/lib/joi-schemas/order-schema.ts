import Joi from 'joi';

const createOrderSchema = {
    body: Joi.object({
        paymentMethod: Joi.string().trim().required(),
        items: Joi.array().items(
            Joi.object({
                inventoryId: Joi.string().trim().required(),
                quantity: Joi.number().greater(0).required(),
            })
        ),
    }),
};

export { createOrderSchema };
