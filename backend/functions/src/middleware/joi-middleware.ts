import type { Request, Response, NextFunction } from 'express';
import type { Schema, ValidationError } from 'joi';
import httpStatus from 'http-status';
import ResponseCodes from '../../commons/response-codes';
import { TJoiError, TSchemaBody } from '../lib/types/joi-types';

const mapJoiError = (error: Partial<ValidationError> & TJoiError) => {
  if (!error) return;

  const joiError = error as Partial<ValidationError> & TJoiError;
  joiError.message = error.details![0]?.message || 'joi error';
  joiError.status = httpStatus.BAD_REQUEST;
  joiError.statusCode = ResponseCodes.BAD_REQUEST;
  joiError.stack = error.stack;

  return joiError;
};

const validateSchema = (schema: TSchemaBody<Schema>, request: Request) => {
  const { query, body } = schema;

  if (body) {
    return query.validate(request.body, { abortEarly: false });
  }

  return query.validate(request.body, { abortEarly: false });
};

const requestSchemaValidate =
  (schema: TSchemaBody<Schema>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = validateSchema(schema, req);

    const err = mapJoiError(error as Partial<ValidationError> & TJoiError);
    if (err) next(err);

    if (schema?.body) req.body = value;
    if (schema?.query) req.query = value;

    next();
  };

export default requestSchemaValidate;
