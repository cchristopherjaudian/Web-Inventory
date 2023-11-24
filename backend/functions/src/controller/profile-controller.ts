import httpStatus from 'http-status';
import { IAuthRequest } from '../..';
import { catchAsync } from '../helpers/catch-async';
import ResponseObject from '../lib/response-object';
import ResponseCodes from '../../commons/response-codes';
import Prisma from '../lib/prisma';
import ProfileService from '../services/profile-service';

const db = Prisma.Instance.db;
const response = new ResponseObject();
const profileInstance = new ProfileService(db);

const create = catchAsync(async (req, res) => {
    const request = req as IAuthRequest;
    const profile = await profileInstance.createProfile({
        ...request.body,
        account: {
            id: request.account.id,
        },
    });
    await db.$disconnect();
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
    await db.$disconnect();
    response.createResponse(
        res,
        httpStatus.OK,
        ResponseCodes.DATA_RETRIEVED,
        profile!
    );
});

const updateProfile = catchAsync(async (req, res) => {
    const request = req as IAuthRequest;

    req.body.account.id = request.profile.account.id;
    const profile = await profileInstance.updateProfile(req.body);
    await db.$disconnect();
    response.createResponse(
        res,
        httpStatus.OK,
        ResponseCodes.DATA_MODIFIED,
        profile!
    );
});

const createFullProfile = catchAsync(async (req, res) => {
    const profile = await profileInstance.createFullProfile(req.body);
    await db.$disconnect();
    response.createResponse(
        res,
        httpStatus.OK,
        ResponseCodes.DATA_CREATED,
        profile!
    );
});

const checkExisting = catchAsync(async (req, res) => {
    const profile = await profileInstance.checkExisting(req.query);
    await db.$disconnect();
    response.createResponse(
        res,
        httpStatus.OK,
        ResponseCodes.DATA_CREATED,
        profile!
    );
});

export default {
    create,
    getProfile,
    updateProfile,
    createFullProfile,
    checkExisting,
};
