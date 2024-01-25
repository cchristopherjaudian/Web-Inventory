import httpStatus from 'http-status';
import ResponseObject from '../lib/response-object';
import { catchAsync } from '../helpers/catch-async';
import ResponseCodes from '../../commons/response-codes';
import Prisma from '../lib/prisma';
import AccountService from '../services/account-service';

const db = Prisma.Instance.db;
const accountInstance = new AccountService(db);
const response = new ResponseObject();

const register = catchAsync(async (req, res) => {
  const account = await accountInstance.createAccount(req.body);
  await db.$disconnect();
  response.createResponse(
    res,
    httpStatus.OK,
    ResponseCodes.DATA_CREATED,
    account
  );
});

const login = catchAsync(async (req, res) => {
  const account = await accountInstance.login(req.body);
  await db.$disconnect();
  response.createResponse(
    res,
    httpStatus.OK,
    ResponseCodes.DATA_RETRIEVED,
    account
  );
});

const forgotPassword = catchAsync(async (req, res) => {
  const account = await accountInstance.forgotPassword(req.body);
  await db.$disconnect();
  response.createResponse(
    res,
    httpStatus.OK,
    ResponseCodes.DATA_RETRIEVED,
    account
  );
});

const getAccount = catchAsync(async (req, res) => {
  const account = await accountInstance.findAccount(req.query);
  await db.$disconnect();
  response.createResponse(
    res,
    httpStatus.OK,
    ResponseCodes.DATA_RETRIEVED,
    account!
  );
});

export default { register, login, forgotPassword, getAccount };
