import httpStatus from 'http-status';
import ResponseObject from '../lib/response-object';
import { catchAsync } from '../helpers/catch-async';
import ResponseCodes from '../../commons/response-codes';
import { IAuthRequest } from '../..';
import OrderService from '../services/order-service';
import Prisma from '../lib/prisma';

const db = Prisma.Instance.db;
const order = new OrderService(db);
const response = new ResponseObject();

const createOrder = catchAsync(async (req, res) => {
    const request = req as IAuthRequest;
    const newItem = await order.createOrder({
        ...req.body,
        accountId: request.profile.id,
    });
    await db.$disconnect();
    response.createResponse(
        res,
        httpStatus.OK,
        ResponseCodes.DATA_CREATED,
        newItem
    );
});

const createOrderStatus = catchAsync(async (req, res) => {
    const request = req as IAuthRequest;
    const newStatus = await order.createOrderStatus({
        ...req.body,
        adminId: request.profile.id,
    });
    await db.$disconnect();
    response.createResponse(
        res,
        httpStatus.OK,
        ResponseCodes.DATA_CREATED,
        newStatus
    );
});

const updateOrder = catchAsync(async (req, res) => {
    const newStatus = await order.updateOrder(req.params.orderId, req.body);
    await db.$disconnect();
    response.createResponse(
        res,
        httpStatus.OK,
        ResponseCodes.DATA_MODIFIED,
        newStatus
    );
});

const listOrders = catchAsync(async (req, res) => {
    const newStatus = await order.orders();
    await db.$disconnect();
    response.createResponse(
        res,
        httpStatus.OK,
        ResponseCodes.LIST_RETRIEVED,
        newStatus
    );
});

export default { createOrder, createOrderStatus, updateOrder, listOrders };
