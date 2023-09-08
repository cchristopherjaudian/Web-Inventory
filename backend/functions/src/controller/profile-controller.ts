import httpStatus from 'http-status';
import { IAuthRequest } from '../..';
import { catchAsync } from '../helpers/catch-async';
import ResponseObject from '../lib/response-object';
import { ProfileSerivce } from '../services';
import ResponseCodes from '../../commons/response-codes';

const response = new ResponseObject();
const profileInstance = new ProfileSerivce();

const create = catchAsync(async (req, res) => {
  const request = req as IAuthRequest;
  const profile = await profileInstance.createProfile({
    ...request.body,
    account: {
      id: request.account.id,
    },
  });

  response.createResponse(
    res,
    httpStatus.OK,
    ResponseCodes.DATA_CREATED,
    profile
  );
});

const getProfile = catchAsync(async (req, res) => {
  const request = req as IAuthRequest;
  const profile = await profileInstance.getProfile({
    accountId: request.account.id,
  });

  response.createResponse(
    res,
    httpStatus.OK,
    ResponseCodes.DATA_RETRIEVED,
    profile!
  );
});

export default { create, getProfile };
