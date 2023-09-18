import { OrderItems, OrderStatus, Orders } from '@prisma/client';

export type TOrder = Omit<Orders, 'id' | 'createdAt' | 'updatedAt'>;

export type TOrderItems = Omit<OrderItems, 'id' | 'createdAt' | 'updatedAt'>;
export type TOrderStatus = Omit<OrderStatus, 'id' | 'createdAt' | 'updatedAt'>;

export type TOrderPayload = TOrder & {
    items: Omit<TOrderItems & { cartId?: string }, 'orderId'>[];
};

export type TOrderWithoutItems = Omit<TOrderPayload, 'items'>;
