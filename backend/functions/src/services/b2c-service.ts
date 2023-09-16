import {TAccountsListQuery} from '../lib/types/accounts-types';
import B2cRepository from '../repositories/b2c-repository';

class B2cService {
  private _repo = new B2cRepository();

  public async getB2cList(params: TAccountsListQuery) {
    return await this._repo.b2cList(params);
  }
}

export default B2cService;
