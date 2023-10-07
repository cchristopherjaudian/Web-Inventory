import JoiImport from 'joi';
import joiDate from '@joi/date';

const Joi = JoiImport.extend(joiDate) as typeof JoiImport;

const getMetricsSales = {
    query: Joi.object({
        startsAt: Joi.date().format('YYYY-MM-DD').required(),
        endsAt: Joi.date().format('YYYY-MM-DD').required(),
    }),
};

export { getMetricsSales };
