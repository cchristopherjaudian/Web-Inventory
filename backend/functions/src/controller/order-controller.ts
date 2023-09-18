import httpStatus from 'http-status';
import ResponseObject from '../lib/response-object';
import { catchAsync } from '../helpers/catch-async';
import ResponseCodes from '../../commons/response-codes';
import { IAuthRequest } from '../..';
import OrderService from '../services/order-service';

const order = new OrderService();
const response = new ResponseObject();

const createOrder = catchAsync(async (req, res) => {
    const request = req as IAuthRequest;
    const newItem = await order.createOrder({
        ...req.body,
        accountId: request.account.id,
    });
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
        adminId: request.account.id,
    });
    response.createResponse(
        res,
        httpStatus.OK,
        ResponseCodes.DATA_CREATED,
        newStatus
    );
});

const updateOrder = catchAsync(async (req, res) => {
    const newStatus = await order.updateOrder(req.params.orderId, req.body);
    response.createResponse(
        res,
        httpStatus.OK,
        ResponseCodes.DATA_MODIFIED,
        newStatus
    );
});

const listOrders = catchAsync(async (req, res) => {
    const newStatus = await order.orders();
    response.createResponse(
        res,
        httpStatus.OK,
        ResponseCodes.DATA_MODIFIED,
        newStatus
    );
});

export default { createOrder, createOrderStatus, updateOrder, listOrders };
