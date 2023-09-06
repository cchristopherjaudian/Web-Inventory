import Joi from 'joi';
import { AccountStatuses } from '../types/accounts-types';

const createAccountSchema = {
  body: Joi.object({
    email: Joi.string().email().trim().required(),
    password: Joi.string().required(),
    accountType: Joi.string().valid(...Object.values(AccountStatuses)),
  }),
};

export { createAccountSchema };
