import { Cart } from '@prisma/client';

export type TCart = Omit<Cart, 'id' | 'createdAt' | 'updatedAt'> & {
  id?: string;
};

export type TCartList = {
  profileId: string;
};
