import { Request } from 'express';
import { TAccounts } from './src/lib/types/accounts-types';

type TResponseError = {
  statusCode?: string;
  status?: number;
  message?: string;
  stack?: string;
};

export interface IAuthRequest extends Request {
  account: TAccounts;
}

export type TNormalizedError = Error & TResponseError;
