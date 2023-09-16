import {AccountTypes} from '@prisma/client';
import {TQueryArgs} from '../..';
import {TAccountsListQuery} from '../lib/types/accounts-types';
import AccountRepository from './account-repository';

class B2cRepository {
  private _acc = new AccountRepository();

  public async b2cList(params: TAccountsListQuery) {
    const query = {where: {}} as TQueryArgs;

    if (params?.search) {
      query.where!.email = {
        contains: params.search,
      };
    }

    if (params?.status) {
      query.where!.status = params.status;
    }

    return await this._acc.list({
      where: {...query.where, accountType: AccountTypes.CUSTOMER},
    });
  }
}

export default B2cRepository;
