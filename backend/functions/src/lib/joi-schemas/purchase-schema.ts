import JoiImport from 'joi';
import joiDate from '@joi/date';

const Joi = JoiImport.extend(joiDate) as typeof JoiImport;

const createPurchaseSchema = {
    body: Joi.object({
        cart: Joi.array().items(
            Joi.object({
                code: Joi.string().trim().required(),
                quantity: Joi.number().greater(0).required(),
                groupNo: Joi.string().trim().required(),
                dateRequested: Joi.date().format('YYYY-MM-DD').required(),
                dateRequired: Joi.date().format('YYYY-MM-DD').required(),
            })
        ),
    }),
};

export { createPurchaseSchema };
