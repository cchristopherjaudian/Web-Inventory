import { NextFunction, Response, Request } from 'express';
import httpStatus from 'http-status';
import { NotFoundError } from '../lib/custom-errors/class-errors';
import ResponseCodes from '../../commons/response-codes';
import { TNormalizedError } from '../..';

class RouteMiddleware {
    public notFound(req: Request, res: Response, next: NextFunction): void {
        const error = new NotFoundError(`cannot find -> ${req.originalUrl}`);
        res.status(httpStatus.NOT_FOUND);
        next(error);
    }

    /*  eslint-disable @typescript-eslint/no-unused-vars */
    public errorResponse(
        error: TNormalizedError,
        req: Request,
        res: Response,
        next: NextFunction
    ): void {
        const status = error.status || httpStatus.INTERNAL_SERVER_ERROR;
        const statusCode =
            error.statusCode || ResponseCodes.INTERNAL_SERVER_ERROR;
        res.status(status).json({
            status,
            code: statusCode,
            data: {
                message: error.message,
                stack: process.env.NODE_ENV === 'production' ? '' : error.stack,
            },
        });
    }
}

export default RouteMiddleware;
