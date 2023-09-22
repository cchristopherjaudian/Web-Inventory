import httpStatus from 'http-status';
import { catchAsync } from '../helpers/catch-async';
import ResponseObject from '../lib/response-object';
import ResponseCodes from '../../commons/response-codes';
import ProductsService from '../services/product-service';
import { TProductsQuery } from '../lib/types/product-types';
import Prisma from '../lib/prisma';

const db = Prisma.Instance.db;
const response = new ResponseObject();
const productInstance = new ProductsService(db);

const createProduct = catchAsync(async (req, res) => {
    const product = await productInstance.createProduct(req.body);
    await db.$disconnect();
    response.createResponse(
        res,
        httpStatus.OK,
        ResponseCodes.DATA_CREATED,
        product
    );
});

const getProduct = catchAsync(async (req, res) => {
    const product = await productInstance.findProduct({
        id: req.params.productId,
    });
    await db.$disconnect();
    response.createResponse(
        res,
        httpStatus.OK,
        ResponseCodes.DATA_RETRIEVED,
        product!
    );
});

const getProductList = catchAsync(async (req, res) => {
    const product = await productInstance.productList(
        req.query as TProductsQuery
    );
    await db.$disconnect();
    response.createResponse(
        res,
        httpStatus.OK,
        ResponseCodes.LIST_RETRIEVED,
        product!
    );
});

const updateProduct = catchAsync(async (req, res) => {
    const product = await productInstance.update(
        req.params.productId,
        req.body
    );
    await db.$disconnect();
    response.createResponse(
        res,
        httpStatus.OK,
        ResponseCodes.DATA_MODIFIED,
        product!
    );
});

export default { createProduct, getProduct, updateProduct, getProductList };
