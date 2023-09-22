import httpStatus from 'http-status';
import ResponseObject from '../lib/response-object';
import { catchAsync } from '../helpers/catch-async';
import ResponseCodes from '../../commons/response-codes';
import CartService from '../services/cart-service';
import { IAuthRequest } from '../..';
import Prisma from '../lib/prisma';

const db = Prisma.Instance.db;
const cart = new CartService(db);
const response = new ResponseObject();

const addCart = catchAsync(async (req, res) => {
    const request = req as IAuthRequest;
    const newItem = await cart.addCart({
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

const getUserCart = catchAsync(async (req, res) => {
    const request = req as IAuthRequest;
    const items = await cart.getUserCart({
        profileId: request.profile.id as string,
    });
    await db.$disconnect();
    response.createResponse(
        res,
        httpStatus.OK,
        ResponseCodes.LIST_RETRIEVED,
        items
    );
});

const deleteCartItem = catchAsync(async (req, res) => {
    const deleted = await cart.deleteCartItem(req.params.cartId);
    await db.$disconnect();
    response.createResponse(
        res,
        httpStatus.OK,
        ResponseCodes.DATA_MODIFIED,
        deleted
    );
});

export default { addCart, getUserCart, deleteCartItem };
