import bcrypt from 'bcrypt';
import { TAccounts } from '../lib/types/accounts-types';
import { AccountRepository } from '../repositories/';
import {
  AuthenticationError,
  NotFoundError,
} from '../lib/custom-errors/class-errors';
import TokenService from './token-service';

class AccountService {
  private _repo = new AccountRepository();
  private _token = new TokenService();

  public async createAccount(payload: Omit<TAccounts, 'status'>) {
    let account;
    let newData = false;
    // checks if email exists
    account = await this._repo.findOne({ email: payload.email });
    if (!account) {
      account = await this._repo.create(payload);
      newData = true;
    }

    const token = await this._token.sign(account);
    return {
      token,
      newData,
    };
  }

  public async findAccount(payload: Partial<TAccounts>) {
    const account = await this._repo.findOne(payload);
    return account;
  }
}

export default AccountService;
