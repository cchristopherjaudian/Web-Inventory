import { StockIndicator } from '@prisma/client';
import INVENTORY_CONSTANTS from '../../commons/inventory-contants';

export const getStockIndicator = (stock: number) => {
    if (stock < INVENTORY_CONSTANTS.Threshold) {
        return StockIndicator.LOW;
    }

    if (stock > INVENTORY_CONSTANTS.Threshold) {
        return StockIndicator.HIGH;
    }

    return StockIndicator.NORMAL;
};
