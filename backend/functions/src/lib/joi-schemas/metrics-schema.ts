import Joi from 'joi';

const getMetricsSales = {
    query: Joi.object({
        startsAt: Joi.date().format('YYYY-MM-DD').required(),
        endsAt: Joi.date().format('YYYY-MM-DD').required(),
    }),
};

export { getMetricsSales };
