import Joi from 'joi';

const createProductSchema = {
  body: Joi.object({
    name: Joi.string().trim().required(),
    code: Joi.string().trim().required(),
    size: Joi.string().trim().optional(),
    price: Joi.number().precision(2).required(),
    content: Joi.number().precision(2).optional(),
  }),
};

const updateProductSchema = {
  body: Joi.object({
    name: Joi.string().trim().optional(),
    code: Joi.string().trim().optional(),
    size: Joi.string().trim().optional(),
    price: Joi.number().precision(2).optional(),
    content: Joi.number().precision(2).optional(),
  }),
};

const productListQuery = {
  query: Joi.object({
    searchField: Joi.string().trim().optional(),
    search: Joi.string().trim().optional().when('searchField', {
      is: undefined,
      then: Joi.required(),
    }),
    whereField: Joi.string().trim().optional(),
    where: Joi.string().trim().optional().when('whereField', {
      is: undefined,
      then: Joi.required(),
    }),
  }),
};

export {createProductSchema, updateProductSchema, productListQuery};
