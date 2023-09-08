import Joi from 'joi';
import { AccountTypes } from '@prisma/client';

const registerSchema = {
  body: Joi.object({
    email: Joi.string().email().trim().required(),
    accountType: Joi.string().valid(...Object.values(AccountTypes)),
  }),
};

const loginSchema = {
  body: Joi.object({
    email: Joi.string().email().trim().required(),
  }),
};

export { registerSchema, loginSchema };
