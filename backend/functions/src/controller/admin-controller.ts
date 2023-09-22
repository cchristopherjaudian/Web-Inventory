import httpStatus from 'http-status';
import ResponseObject from '../lib/response-object';
import { catchAsync } from '../helpers/catch-async';
import ResponseCodes from '../../commons/response-codes';
import AdminService from '../services/admin-service';
import Prisma from '../lib/prisma';

const db = Prisma.Instance.db;
const admin = new AdminService(db);
const response = new ResponseObject();

const getAdminList = catchAsync(async (req, res) => {
    const admins = await admin.getAdminList();
    await db.$disconnect();
    response.createResponse(
        res,
        httpStatus.OK,
        ResponseCodes.LIST_RETRIEVED,
        admins
    );
});

export default { getAdminList };
