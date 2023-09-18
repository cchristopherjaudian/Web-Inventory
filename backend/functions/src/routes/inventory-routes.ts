import { Router } from 'express';
// import {} from '../controller';
import JoiMiddleware from '../middleware/joi-middleware';
import AuthMiddleware from '../middleware/auth-middleware';
import { InventoryController } from '../controller';
import {
    createInventorySchema,
    getInventoriesSchema,
    updateInventorySchema,
} from '../lib/joi-schemas/inventory-schema';

const router = Router();
const joi = new JoiMiddleware();
const authMiddleware = new AuthMiddleware();

router
    .post(
        '/',
        joi.requestSchemaValidate(createInventorySchema),
        authMiddleware.adminValidate(['ADMIN', 'SUB_2']) as any,
        InventoryController.createInventory
    )
    .get(
        '/:inventoryId',
        authMiddleware.endUserValidate as any,
        InventoryController.getInventory
    )
    .get(
        '/',
        authMiddleware.endUserValidate as any,
        joi.requestSchemaValidate(getInventoriesSchema),
        InventoryController.getInventories
    )
    .patch(
        '/:inventoryId',
        authMiddleware.adminValidate(['ADMIN', 'SUB_2']) as any,
        joi.requestSchemaValidate(updateInventorySchema),
        InventoryController.updateInventory
    );

export default router;
