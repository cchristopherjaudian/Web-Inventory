import httpStatus from 'http-status';
import ResponseObject from '../lib/response-object';
import { catchAsync } from '../helpers/catch-async';
import ResponseCodes from '../../commons/response-codes';
import InventoryService from '../services/inventory-service';

const inventory = new InventoryService();
const response = new ResponseObject();

const createInventory = catchAsync(async (req, res) => {
    const newInventory = await inventory.createInventory(req.body);
    response.createResponse(
        res,
        httpStatus.OK,
        ResponseCodes.DATA_CREATED,
        newInventory
    );
});

const getInventory = catchAsync(async (req, res) => {
    const newInventory = await inventory.getInventory(req.params.inventoryId);
    response.createResponse(
        res,
        httpStatus.OK,
        ResponseCodes.DATA_RETRIEVED,
        newInventory
    );
});

const getInventories = catchAsync(async (req, res) => {
    const newInventory = await inventory.getInventories(req.query);
    response.createResponse(
        res,
        httpStatus.OK,
        ResponseCodes.LIST_RETRIEVED,
        newInventory
    );
});

export default { createInventory, getInventory, getInventories };
