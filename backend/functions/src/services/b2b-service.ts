import { TAccountsListQuery } from '../lib/types/accounts-types';
import B2bRepository from '../repositories/b2b-repository';

class B2bService {
    private _repo = new B2bRepository();

    public async getCustomers(params: TAccountsListQuery) {
        return await this._repo.b2bList(params);
    }
}

export default B2bService;
