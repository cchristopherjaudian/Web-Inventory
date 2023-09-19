import httpStatus from 'http-status';
import { IAuthRequest } from '../..';
import { catchAsync } from '../helpers/catch-async';
import ResponseObject from '../lib/response-object';
import ResponseCodes from '../../commons/response-codes';
import { ProfileService } from '../services';

const response = new ResponseObject();
const profileInstance = new ProfileService();

const create = catchAsync(async (req, res) => {
    const request = req as IAuthRequest;
    const profile = await profileInstance.createProfile({
        ...request.body,
        account: {
            id: request.account.id,
            accountType: request.body.account.accountType,
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
        accountId: request.profile.account.id,
    });

    response.createResponse(
        res,
        httpStatus.OK,
        ResponseCodes.DATA_RETRIEVED,
        profile!
    );
});

const updateProfile = catchAsync(async (req, res) => {
    const profile = await profileInstance.updateProfile(req.body);

    response.createResponse(
        res,
        httpStatus.OK,
        ResponseCodes.DATA_MODIFIED,
        profile!
    );
});

export default { create, getProfile, updateProfile };
