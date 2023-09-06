import { TAccounts } from '../../lib/types/accounts-types';
import Accounts from '../models/accounts-model';

class AccountRepository {
  private _model = Accounts;

  public async create(payload: TAccounts) {
    const account = await this._model.create(payload);
    return account;
  }

  public async update(account: Accounts, payload: TAccounts) {
    const updated = await account.update(payload);
    return updated;
  }

  public async findOne(account: Accounts, payload: TAccounts) {
    const updated = await account.update(payload);
    return updated;
  }
}

export default AccountRepository;
