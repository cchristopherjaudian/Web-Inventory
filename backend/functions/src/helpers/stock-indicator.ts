import { StockIndicator } from '@prisma/client';
import INVENTORY_CONSTANTS from '../../commons/inventory-contants';

export const getStockIndicator = (stock: number, threshold: number) => {
  if (stock < threshold) {
    return StockIndicator.LOW;
  }

  if (stock > threshold) {
    return StockIndicator.HIGH;
  }

  return StockIndicator.NORMAL;
};
