import { OrderStatuses, PaymentMethods, PaymentStatuses } from '@prisma/client';
import JoiImport from 'joi';
import joiDate from '@joi/date';

const Joi = JoiImport.extend(joiDate) as typeof JoiImport;

const createOrderSchema = {
    body: Joi.object({
        paymentMethod: Joi.string()
            .trim()
            .valid(...Object.keys(PaymentMethods))
            .required(),
        items: Joi.array().items(
            Joi.object({
                productId: Joi.string().trim().required(),
                cartId: Joi.string().trim().required(),
            })
        ),
    }),
};

const createOrderStatusSchema = {
    body: Joi.object({
        orderId: Joi.string().trim().required(),
        orderStatusId: Joi.string().trim().required(),
        createdAt: Joi.date().format('YYYY-MM-DD').required(),
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
            .optional(),
        refNo: Joi.string().trim().optional(),
        paymentUrl: Joi.string().trim().optional(),
        deliveryUrl: Joi.string().trim().optional(),
    }),
};

const getOrderSalesSchema = {
    query: Joi.object({
        startsAt: Joi.date().format('YYYY-MM-DD').required(),
        endsAt: Joi.date().format('YYYY-MM-DD').required(),
    }),
};

export {
    createOrderSchema,
    createOrderStatusSchema,
    updateOrderSchema,
    getOrderSalesSchema,
};
