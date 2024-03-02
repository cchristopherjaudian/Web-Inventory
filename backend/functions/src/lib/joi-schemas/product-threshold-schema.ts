import Joi from 'joi';

const createThresholdSchema = {
  body: Joi.object().keys({
    productId: Joi.string().trim().required(),
    threshold: Joi.number().greater(0).required(),
  }),
};

export { createThresholdSchema };
