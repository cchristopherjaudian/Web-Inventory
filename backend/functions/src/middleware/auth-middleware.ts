import { NextFunction, Request, Response } from 'express';
import { AuthenticationError } from '../lib/custom-errors/class-errors';
import TokenService from '../services/token-service';

class TokenMiddleware {
  private _jwt = new TokenService();

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
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers['authorization'];
      const authUser = await this.verifyToken(token as string);

      next();
    } catch (error) {
      next(error);
    }
  };
}

export default TokenMiddleware;
