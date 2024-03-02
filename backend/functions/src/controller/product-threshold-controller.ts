import httpStatus from 'http-status';
import ResponseObject from '../lib/response-object';
import { catchAsync } from '../helpers/catch-async';
import ResponseCodes from '../../commons/response-codes';
import Prisma from '../lib/prisma';
import ProductThresholdService from '../services/product-threshold-service';

const db = Prisma.Instance.db;
const productThreshold = new ProductThresholdService(db);
const response = new ResponseObject();

const createThreshold = catchAsync(async (req, res) => {
  const newThreshold = await productThreshold.createThreshold(req.body);
  await db.$disconnect();
  response.createResponse(
    res,
    httpStatus.OK,
    ResponseCodes.DATA_CREATED,
    newThreshold
  );
});

export default { createThreshold };
