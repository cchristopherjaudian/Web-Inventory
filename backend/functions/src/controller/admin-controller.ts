import httpStatus from 'http-status';
import ResponseObject from '../lib/response-object';
import { catchAsync } from '../helpers/catch-async';
import ResponseCodes from '../../commons/response-codes';
import AdminService from '../services/admin-service';

const admin = new AdminService();
const response = new ResponseObject();

const getAdminList = catchAsync(async (req, res) => {
  const admins = await admin.getAdminList();
  response.createResponse(
    res,
    httpStatus.OK,
    ResponseCodes.LIST_RETRIEVED,
    admins
  );
});

export default { getAdminList };
