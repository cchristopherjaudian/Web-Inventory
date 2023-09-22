import httpStatus from 'http-status';
import ResponseObject from '../lib/response-object';
import { catchAsync } from '../helpers/catch-async';
import ResponseCodes from '../../commons/response-codes';
import InventoryService from '../services/inventory-service';
import Prisma from '../lib/prisma';

const db = Prisma.Instance.db;
const inventory = new InventoryService(db);
const response = new ResponseObject();

const createInventory = catchAsync(async (req, res) => {
    const newInventory = await inventory.createInventory(req.body);
    await db.$disconnect();
    response.createResponse(
        res,
        httpStatus.OK,
        ResponseCodes.DATA_CREATED,
        newInventory
    );
});

const getInventory = catchAsync(async (req, res) => {
    const newInventory = await inventory.getInventory(req.params.inventoryId);
    await db.$disconnect();
    response.createResponse(
        res,
        httpStatus.OK,
        ResponseCodes.DATA_RETRIEVED,
        newInventory
    );
});

const getInventories = catchAsync(async (req, res) => {
    const newInventory = await inventory.getInventories(req.query);
    await db.$disconnect();
    response.createResponse(
        res,
        httpStatus.OK,
        ResponseCodes.LIST_RETRIEVED,
        newInventory
    );
});

const updateInventory = catchAsync(async (req, res) => {
    const newInventory = await inventory.updateInventory(
        req.params.inventoryId,
        req.body
    );
    await db.$disconnect();
    response.createResponse(
        res,
        httpStatus.OK,
        ResponseCodes.DATA_MODIFIED,
        newInventory
    );
});

export default {
    createInventory,
    getInventory,
    getInventories,
    updateInventory,
};
