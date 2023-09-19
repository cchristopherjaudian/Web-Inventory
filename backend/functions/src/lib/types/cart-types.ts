import { Cart } from '@prisma/client';

export type TCart = Omit<Cart, 'id' | 'createdAt' | 'updatedAt'>;

export type TCartList = {
    profileId: string;
};
