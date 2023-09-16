import { NextFunction, Response } from 'express';
import { AuthenticationError } from '../lib/custom-errors/class-errors';
import { AccountService, TokenService } from '../services';
import { IAuthRequest } from '../..';
import { TAccounts } from '../lib/types/accounts-types';
import { AccountStatuses, AccountTypes } from '@prisma/client';

class AuthMiddleware {
  private _jwt = new TokenService();
  private _account = new AccountService();

  private async verifyToken(token: string) {
    try {
      if (!token) {
        throw new AuthenticationError();
      }
      const isVerified = await this._jwt.verify(token);
      return isVerified.id;
    } catch (error) {
      throw error;
    }
  }

  public endUserValidate = async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers['authorization'];
      const authUser = await this.verifyToken(token as string);

      const account = await this._account.findAccount({ id: authUser });
      if (!account) throw new AuthenticationError();

      req.account = account as TAccounts & { status: AccountStatuses };
      next();
    } catch (error) {
      next(error);
    }
  };

  public adminValidate =
    (roles: AccountTypes[]) =>
      async (req: IAuthRequest, res: Response, next: NextFunction) => {
        try {
          const token = req.headers['authorization'];
          const authUser = await this.verifyToken(token as string);

          const account = await this._account.findAccount({ id: authUser });
          if (!account) throw new AuthenticationError();
          if (!roles.includes(account.accountType)) {
            throw new AuthenticationError();
          }

          req.account = account as TAccounts & { status: AccountStatuses };
          next();
        } catch (error) {
          next(error);
        }
      };
}

export default AuthMiddleware;
