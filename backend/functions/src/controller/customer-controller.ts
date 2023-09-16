import httpStatus from 'http-status';
import ResponseObject from '../lib/response-object';
import {catchAsync} from '../helpers/catch-async';
import ResponseCodes from '../../commons/response-codes';
import CustomerService from '../services/b2c-service';
import {TAccountsListQuery} from '../lib/types/accounts-types';

const customer = new CustomerService();
const response = new ResponseObject();

const getb2cList = catchAsync(async (req, res) => {
  const customers = await customer.getB2cList(req.query as TAccountsListQuery);
  response.createResponse(
    res,
    httpStatus.OK,
    ResponseCodes.LIST_RETRIEVED,
    customers
  );
});

export default {getb2cList};
