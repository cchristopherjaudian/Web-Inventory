import httpStatus from 'http-status';
import ResponseObject from '../lib/response-object';
import { catchAsync } from '../helpers/catch-async';
import ResponseCodes from '../../commons/response-codes';
import B2cService from '../services/b2c-service';
import { TAccountsListQuery } from '../lib/types/accounts-types';
import Prisma from '../lib/prisma';

const db = Prisma.Instance.db;
const customer = new B2cService(db);
const response = new ResponseObject();

const getb2cList = catchAsync(async (req, res) => {
    const customers = await customer.getB2cList(
        req.query as TAccountsListQuery
    );
    await db.$disconnect();
    response.createResponse(
        res,
        httpStatus.OK,
        ResponseCodes.LIST_RETRIEVED,
        customers
    );
});

export default { getb2cList };
