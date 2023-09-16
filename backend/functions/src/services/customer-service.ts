import { TCustomerListQuery } from '../lib/types/accounts-types';
import CustomerRepository from '../repositories/customer-repository';

class CustomerService {
  private _repo = new CustomerRepository();

  public async getCustomers(params: TCustomerListQuery) {
    return await this._repo.customersList(params);
  }
}

export default CustomerService;
