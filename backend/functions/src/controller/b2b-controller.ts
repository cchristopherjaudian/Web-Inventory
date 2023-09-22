import httpStatus from 'http-status';
import ResponseObject from '../lib/response-object';
import { catchAsync } from '../helpers/catch-async';
import ResponseCodes from '../../commons/response-codes';
import { TAccountsListQuery } from '../lib/types/accounts-types';
import B2bService from '../services/b2b-service';
import Prisma from '../lib/prisma';

const db = Prisma.Instance.db;
const b2b = new B2bService(db);
const response = new ResponseObject();

const getb2cList = catchAsync(async (req, res) => {
    const businesses = await b2b.getB2bList(req.query as TAccountsListQuery);
    await db.$disconnect();
    response.createResponse(
        res,
        httpStatus.OK,
        ResponseCodes.LIST_RETRIEVED,
        businesses
    );
});

export default { getb2cList };
