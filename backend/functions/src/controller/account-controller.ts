import httpStatus from 'http-status';
import {AccountService} from '../services/';
import ResponseObject from '../lib/response-object';
import {catchAsync} from '../helpers/catch-async';
import ResponseCodes from '../../commons/response-codes';

const accountInstance = new AccountService();
const response = new ResponseObject();

const register = catchAsync(async (req, res) => {
  const account = await accountInstance.createAccount(req.body);
  response.createResponse(
    res,
    httpStatus.OK,
    ResponseCodes.DATA_CREATED,
    account
  );
});

export default {register};
