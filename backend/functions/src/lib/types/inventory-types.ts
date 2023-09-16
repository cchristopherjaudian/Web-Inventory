import { Inventory } from '@prisma/client';

export type TInventory = Omit<Inventory, 'id' | 'createdAt' | 'updatedAt'>;

export type TInventoryList = {
    search?: string;
    stock?: string;
};
