import { Products } from '@prisma/client';

export type TProducts = Omit<Products, 'id' | 'createdAt' | 'updatedAt'>;

export type TProductsQuery = {
    search?: string;
};
