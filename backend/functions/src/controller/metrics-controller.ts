import { TOrderSales } from '../lib/types/order-types';
import httpStatus from 'http-status';
import ResponseObject from '../lib/response-object';
import { catchAsync } from '../helpers/catch-async';
import ResponseCodes from '../../commons/response-codes';
import Prisma from '../lib/prisma';
import MetricsService from '../services/metrics-service';

const db = Prisma.Instance.db;
const order = new MetricsService(db);
const response = new ResponseObject();

const getSales = catchAsync(async (req, res) => {
    const newStatus = await order.sales(req.query as TOrderSales);
    await db.$disconnect();
    response.createResponse(
        res,
        httpStatus.OK,
        ResponseCodes.DATA_RETRIEVED,
        newStatus
    );
});

const getPanels = catchAsync(async (req, res) => {
    const newStatus = await order.getPanels();
    await db.$disconnect();
    response.createResponse(
        res,
        httpStatus.OK,
        ResponseCodes.DATA_RETRIEVED,
        newStatus
    );
});

export default {
    getSales,
    getPanels,
};
