import type { Request, Response, NextFunction } from 'express';
import type { Schema, ValidationError } from 'joi';
import httpStatus from 'http-status';
import ResponseCodes from '../../commons/response-codes';
import { TJoiError, TSchemaBody } from '../lib/types/joi-types';

class JoiMiddleware {
    private mapError(error: Partial<ValidationError> & TJoiError) {
        if (!error) return;

        const joiError = error as Partial<ValidationError> & TJoiError;
        joiError.message = error.details![0]?.message || 'joi error';
        joiError.status = httpStatus.BAD_REQUEST;
        joiError.statusCode = ResponseCodes.BAD_REQUEST;
        joiError.stack = error.stack;

        return joiError;
    }

    private validateSchema(schema: TSchemaBody<Schema>, request: Request) {
        const { query, body } = schema;
        if (body) {
            return body.validate(request.body, { abortEarly: false });
        }
        return query.validate(request.query, { abortEarly: false });
    }

    public requestSchemaValidate =
        (schema: TSchemaBody<Schema>) =>
        (req: Request, res: Response, next: NextFunction) => {
            const { error, value } = this.validateSchema(schema, req);

            const err = this.mapError(
                error as Partial<ValidationError> & TJoiError
            );
            if (err) next(err);

            if (schema?.body) req.body = value;
            if (schema?.query) req.query = value;

            next();
        };
}

export default JoiMiddleware;
