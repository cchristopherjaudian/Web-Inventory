import bcrypt from 'bcrypt';
import { TAccounts } from '../lib/types/accounts-types';

class AccountService {
  public async createAccount(payload: Omit<TAccounts, 'status'>) {
    payload.password = await bcrypt.hashSync(payload.password, 10);

    return payload.password;
  }
}

export default AccountService;
