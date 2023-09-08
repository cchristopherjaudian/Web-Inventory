import { NextFunction, Request, Response } from 'express';
import { AuthenticationError } from '../lib/custom-errors/class-errors';
import { AccountService, TokenService } from '../services';
import { IAuthRequest } from '../..';
import { TAccounts } from '../lib/types/accounts-types';
import { AccountStatuses } from '@prisma/client';

class TokenMiddleware {
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
      console.log('account', account);
      console.log('authUser', authUser);
      if (!account) throw new AuthenticationError();

      req.account = account as TAccounts & { status: AccountStatuses };
      next();
    } catch (error) {
      next(error);
    }
  };
}

export default TokenMiddleware;
