import JoiImport from 'joi';
import joiDate from '@joi/date';

const Joi = JoiImport.extend(joiDate) as typeof JoiImport;

const getMetricsSales = {
    query: Joi.object({
        startsAt: Joi.date().format('YYYY-MM-DD').required(),
        endsAt: Joi.date().format('YYYY-MM-DD').required(),
    }),
};

const getRptSchema = {
    query: Joi.object({
        status: Joi.string().trim().optional(),
        startsAt: Joi.date().format('YYYY-MM-DD').optional(),
        endsAt: Joi.date().format('YYYY-MM-DD').optional(),
    }),
};

export { getMetricsSales, getRptSchema };
