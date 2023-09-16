import JoiImport from 'joi';
import joiDate from '@joi/date';
import { StockIndicator } from '@prisma/client';

const Joi = JoiImport.extend(joiDate) as typeof JoiImport;

const createInventorySchema = {
    body: Joi.object({
        stock: Joi.number().greater(0).required(),
        expiration: Joi.date().format('YYYY-MM-DD').required(),
        productId: Joi.string().trim().required(),
    }),
};

const getInventoriesSchema = {
    query: Joi.object({
        stock: Joi.string()
            .trim()
            .valid(...Object.values(StockIndicator))
            .optional(),
        search: Joi.string().trim().optional(),
    }),
};

const updateInventorySchema = {
    body: Joi.object({
        stock: Joi.number().greater(0).optional(),
        expiration: Joi.date().format('YYYY-MM-DD').optional(),
    }),
};

export { createInventorySchema, getInventoriesSchema, updateInventorySchema };
