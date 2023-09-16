import { AccountTypes } from '@prisma/client';
import { TQueryArgs } from '../..';
import { TCustomerListQuery } from '../lib/types/accounts-types';
import AccountRepository from './account-repository';

class CustomerRepository {
  private _acc = new AccountRepository();

  public async customersList(params: TCustomerListQuery) {
    const query = { where: {} } as TQueryArgs;

    if (params?.search) {
      query.where!.email = {
        contains: params.search,
      };
    }

    if (params?.status) {
      query.where!.status = params.status;
    }

    return await this._acc.list({
      where: { ...query.where, accountType: AccountTypes.CUSTOMER },
    });
  }
}

export default CustomerRepository;
