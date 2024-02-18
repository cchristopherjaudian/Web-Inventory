import httpStatus from 'http-status';
import ResponseObject from '../lib/response-object';
import { catchAsync } from '../helpers/catch-async';
import ResponseCodes from '../../commons/response-codes';
import Prisma from '../lib/prisma';
import CustomPricesService from '../services/custom-prices-service';

const db = Prisma.Instance.db;
const customPrices = new CustomPricesService(db);
const response = new ResponseObject();

const updatePrice = catchAsync(async (req, res) => {
  const updatePrice = await customPrices.updatePrice(req.body);
  await db.$disconnect();
  response.createResponse(
    res,
    httpStatus.OK,
    ResponseCodes.DATA_MODIFIED,
    updatePrice
  );
});

const createPrice = catchAsync(async (req, res) => {
  const newPrices = await customPrices.createPrice(req.body);
  await db.$disconnect();
  response.createResponse(
    res,
    httpStatus.OK,
    ResponseCodes.DATA_MODIFIED,
    newPrices
  );
});

export default { updatePrice, createPrice };
