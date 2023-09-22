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

export default { register };
