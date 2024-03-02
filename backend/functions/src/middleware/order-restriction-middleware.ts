import { NextFunction, Response } from 'express';
import {
  AuthenticationError,
  BadRequestError,
} from '../lib/custom-errors/class-errors';
import { IAuthRequest } from '../..';
import { AccountTypes, PaymentMethods, PaymentStatuses } from '@prisma/client';
import { TPrismaClient } from '../lib/prisma';

class OrderRestrictionMiddleware {
  private _db: TPrismaClient;

  constructor(db: TPrismaClient) {
    this._db = db;
  }

  public checkForPendingTxn = async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const request = req as IAuthRequest;

      if (!request?.profile) throw new AuthenticationError('');

      if (request.profile.account.accountType !== AccountTypes.BUSINESS) {
        next();
      }

      const hasPendingOrders = await this._db.orders.aggregate({
        _count: true,
        where: {
          paymentMethod: PaymentMethods.PAY_LATER,
          status: PaymentStatuses.PENDING,
          profileId: request.profile.id,
        },
      });

      if (hasPendingOrders._count > 0) {
        throw new BadRequestError(
          'Please pay for your pending payment, before making another purchase.'
        );
      }

      next();
    } catch (error) {
      next(error);
    } finally {
      await this._db.$disconnect();
    }
  };
}

export default OrderRestrictionMiddleware;
