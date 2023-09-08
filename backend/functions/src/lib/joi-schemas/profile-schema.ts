import Joi from 'joi';
import { AccountTypes } from '@prisma/client';

const createProfileSchema = {
  body: Joi.object({
    firstname: Joi.string().trim().required(),
    lastname: Joi.string().trim().required(),
    address: Joi.string().trim().required(),
    middlename: Joi.string().trim().optional(),
  }),
};

export { createProfileSchema };
