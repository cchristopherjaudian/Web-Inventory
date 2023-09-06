import bcrypt from 'bcrypt';
import { AccountRepository } from '../database/repositories';
import { TAccounts } from '../lib/types/accounts-types';

class AccountService {
  private _repository = new AccountRepository();

  public async createAccount(payload: TAccounts) {
    payload.password = await bcrypt.hashSync(payload.password, 10);
    const account = await this._repository.create(payload);

    return account;
  }
}
