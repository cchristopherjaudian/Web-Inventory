import Prisma from '../lib/prisma';
import { TAccounts } from '../lib/types/accounts-types';

class AccountRepository {
  private _db = Prisma.Instance.db;

  public async create(payload: TAccounts) {
    try {
      const account = await this._db.account.create({
        data: payload,
      });
      return account;
    } catch (error) {
      throw error;
    } finally {
      await this._db.$disconnect();
    }
  }

  public async findOne(payload: Record<string, any>) {
    try {
      const account = await this._db.account.findFirst({
        where: payload,
      });
      return account;
    } catch (error) {
      throw error;
    } finally {
      await this._db.$disconnect();
    }
  }
}

export default AccountRepository;
