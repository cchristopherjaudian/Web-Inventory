import Joi from 'joi';

const updatePriceSchema = {
  body: Joi.object().keys({
    pr: Joi.array().items(
      Joi.object({
        price: Joi.number().min(1).required(),
        id: Joi.string().trim().required(),
      })
    ),
  }),
};

const createPriceSchema = {
  body: Joi.object().keys({
    pr: Joi.array().items(
      Joi.object({
        price: Joi.number().min(1).required(),
        cartId: Joi.string().trim().required(),
      })
    ),
  }),
};

export { updatePriceSchema, createPriceSchema };
