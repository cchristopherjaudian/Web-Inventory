import httpStatus from 'http-status';
import ResponseObject from '../lib/response-object';
import { catchAsync } from '../helpers/catch-async';
import ResponseCodes from '../../commons/response-codes';
import { IAuthRequest } from '../..';
import OrderService from '../services/order-service';
import Prisma from '../lib/prisma';
import { TOrderSales } from '../lib/types/order-types';

const db = Prisma.Instance.db;
const order = new OrderService(db);
const response = new ResponseObject();

const createOrder = catchAsync(async (req, res) => {
    const request = req as IAuthRequest;
    const newItem = await order.createOrder({
        ...req.body,
        profileId: request.profile.id,
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

const getOrder = catchAsync(async (req, res) => {
    const orderInfo = await order.getOrder(req.params.orderId);
    await db.$disconnect();
    response.createResponse(
        res,
        httpStatus.OK,
        ResponseCodes.DATA_MODIFIED,
        orderInfo!
    );
});

const endUserOrders = catchAsync(async (req, res) => {
    const request = req as IAuthRequest;
    const newStatus = await order.endUserOrders(request.profile.id);
    await db.$disconnect();
    response.createResponse(
        res,
        httpStatus.OK,
        ResponseCodes.LIST_RETRIEVED,
        newStatus
    );
});

const adminOrders = catchAsync(async (req, res) => {
    const newStatus = await order.adminOrders();
    await db.$disconnect();
    response.createResponse(
        res,
        httpStatus.OK,
        ResponseCodes.LIST_RETRIEVED,
        newStatus
    );
});

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

export default {
    createOrder,
    createOrderStatus,
    updateOrder,
    endUserOrders,
    getSales,
    adminOrders,
    getOrder,
};
