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
    profileId: request.profile.id,
    accType: request.profile.account.accountType,
  });
  await db.$disconnect();
  response.createResponse(
    res,
    httpStatus.OK,
    ResponseCodes.DATA_CREATED,
    newItem!
  );
});

const createOrderStatus = catchAsync(async (req, res) => {
  const request = req as IAuthRequest;
  const newStatus = await order.createOrderStatus({
    ...req.body,
    profileId: request.profile.id,
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
  const updatedOrder = await order.updateOrder(req.params.orderId, req.body);
  await db.$disconnect();
  response.createResponse(
    res,
    httpStatus.OK,
    ResponseCodes.DATA_MODIFIED,
    updatedOrder
  );
});

const cancelOrder = catchAsync(async (req, res) => {
  const newStatus = await order.cancelOrder(req.params.orderId);
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
    ResponseCodes.DATA_RETRIEVED,
    orderInfo!
  );
});

const endUserOrders = catchAsync(async (req, res) => {
  const request = req as IAuthRequest;
  const customersOrders = await order.endUserOrders(request.profile.id);
  await db.$disconnect();
  response.createResponse(
    res,
    httpStatus.OK,
    ResponseCodes.LIST_RETRIEVED,
    customersOrders
  );
});

const adminOrders = catchAsync(async (req, res) => {
  const adminOrderList = await order.adminOrders();
  await db.$disconnect();
  response.createResponse(
    res,
    httpStatus.OK,
    ResponseCodes.LIST_RETRIEVED,
    adminOrderList
  );
});

const getOrdersTxn = catchAsync(async (req, res) => {
  const transactionOrders = await order.ordersTxn();
  await db.$disconnect();
  response.createResponse(
    res,
    httpStatus.OK,
    ResponseCodes.LIST_RETRIEVED,
    transactionOrders
  );
});

const getDispatchOrders = catchAsync(async (req, res) => {
  const dispatchedOrders = await order.getDispatchOrders();
  await db.$disconnect();
  response.createResponse(
    res,
    httpStatus.OK,
    ResponseCodes.LIST_RETRIEVED,
    dispatchedOrders
  );
});

export default {
  createOrder,
  createOrderStatus,
  updateOrder,
  getOrdersTxn,
  endUserOrders,
  adminOrders,
  getOrder,
  cancelOrder,
  getDispatchOrders,
};
