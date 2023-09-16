import httpStatus from 'http-status';
import ResponseObject from '../lib/response-object';
import { catchAsync } from '../helpers/catch-async';
import ResponseCodes from '../../commons/response-codes';
import CustomerService from '../services/customer-service';
import { TCustomerListQuery } from '../lib/types/accounts-types';

const customer = new CustomerService();
const response = new ResponseObject();

const getCustomersList = catchAsync(async (req, res) => {
  const customers = await customer.getCustomers(
    req.query as TCustomerListQuery
  );
  response.createResponse(
    res,
    httpStatus.OK,
    ResponseCodes.LIST_RETRIEVED,
    customers
  );
});

export default { getCustomersList };
