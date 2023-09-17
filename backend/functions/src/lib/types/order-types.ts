import { OrderItems, Orders } from '@prisma/client';

export type TOrder = Omit<Orders, 'id' | 'createdAt' | 'updatedAt'>;

export type TOrderItems = Omit<OrderItems, 'id' | 'createdAt' | 'updatedAt'>;

export type TOrderPayload = TOrder & { items: Omit<TOrderItems, 'orderId'>[] };
