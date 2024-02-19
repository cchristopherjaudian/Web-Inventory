import httpStatus from 'http-status';
import ResponseObject from '../lib/response-object';
import { catchAsync } from '../helpers/catch-async';
import ResponseCodes from '../../commons/response-codes';
import Prisma from '../lib/prisma';
import PurchaseService from '../services/purchase-service';
import { IAuthRequest } from '../..';

const db = Prisma.Instance.db;
const purchase = new PurchaseService(db);
const response = new ResponseObject();

const createPurchase = catchAsync(async (req, res) => {
  const request = req as IAuthRequest;
  const newPr = await purchase.createPurchaseRequest({
    products: req.body.cart,
    profileId: request.profile.id as string,
  });
  await db.$disconnect();
  response.createResponse(res, httpStatus.OK, ResponseCodes.DATA_CREATED, {
    products: newPr,
  });
});

const getPurchaseList = catchAsync(async (req, res) => {
  const request = req as IAuthRequest;
  const newPr = await purchase.getPurchaseList({
    ...req.query,
    profileId: request.profile.id as string,
  });
  await db.$disconnect();
  response.createResponse(
    res,
    httpStatus.OK,
    ResponseCodes.LIST_RETRIEVED,
    newPr
  );
});

const getPendingPrs = catchAsync(async (req, res) => {
  const pendingPrs = await purchase.getPendingPr();
  await db.$disconnect();
  response.createResponse(
    res,
    httpStatus.OK,
    ResponseCodes.LIST_RETRIEVED,
    pendingPrs
  );
});

const getPurchaseRequest = catchAsync(async (req, res) => {
  const newPr = await purchase.getPurchaseRequest(req.params.groupNo);
  await db.$disconnect();
  response.createResponse(
    res,
    httpStatus.OK,
    ResponseCodes.DATA_RETRIEVED,
    newPr
  );
});

export default {
  createPurchase,
  getPurchaseList,
  getPurchaseRequest,
  getPendingPrs,
};
