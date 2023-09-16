import httpStatus from 'http-status';
import {catchAsync} from '../helpers/catch-async';
import ResponseObject from '../lib/response-object';
import ResponseCodes from '../../commons/response-codes';
import ProductsService from '../services/product-service';
import {TProductsQuery} from '../lib/types/product-types';

const response = new ResponseObject();
const productInstance = new ProductsService();

const createProduct = catchAsync(async (req, res) => {
  const product = await productInstance.createProduct(req.body);

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

  response.createResponse(
    res,
    httpStatus.OK,
    ResponseCodes.LIST_RETRIEVED,
    product!
  );
});

const updateProduct = catchAsync(async (req, res) => {
  const product = await productInstance.update({
    id: req.params.productId,
    ...req.body,
  });

  response.createResponse(
    res,
    httpStatus.OK,
    ResponseCodes.DATA_MODIFIED,
    product!
  );
});

export default {createProduct, getProduct, updateProduct, getProductList};
