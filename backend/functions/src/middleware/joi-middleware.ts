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

    private validateSchema(schema: Schema, request: Record<string, unknown>) {
        return schema.validate(request, { abortEarly: false });
    }

    public requestSchemaValidate =
        (requestSchema: TSchemaBody<Schema>) =>
        (req: Request, res: Response, next: NextFunction) => {
            Object.keys(requestSchema).forEach((key) => {
                const { error, value } = this.validateSchema(
                    requestSchema[key as keyof typeof requestSchema],
                    req[key as keyof typeof req]
                );

                const err = this.mapError(
                    error as Partial<ValidationError> & TJoiError
                );

                if (err) next(err);

                if (key === 'body') req.body = value;
                if (key === 'query') req.query = value;
            });

            next();
        };
}

export default JoiMiddleware;
