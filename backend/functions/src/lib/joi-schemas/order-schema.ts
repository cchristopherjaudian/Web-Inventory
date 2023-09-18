import { OrderStatuses, PaymentMethods, PaymentStatuses } from '@prisma/client';
import Joi from 'joi';

const createOrderSchema = {
    body: Joi.object({
        paymentMethod: Joi.string()
            .trim()
            .valid(...Object.keys(PaymentMethods))
            .required(),
        items: Joi.array().items(
            Joi.object({
                inventoryId: Joi.string().trim().required(),
                cartId: Joi.string().trim().required(),
                quantity: Joi.number().greater(0).required(),
            })
        ),
    }),
};

const createOrderStatusSchema = {
    body: Joi.object({
        orderId: Joi.string().trim().required(),
        status: Joi.string()
            .trim()
            .valid(...Object.keys(OrderStatuses))
            .required(),
    }),
};

const updateOrderSchema = {
    body: Joi.object({
        status: Joi.string()
            .valid(...Object.keys(PaymentStatuses))
            .required(),
        refNo: Joi.string().trim().required(),
    }),
};

export { createOrderSchema, createOrderStatusSchema, updateOrderSchema };
