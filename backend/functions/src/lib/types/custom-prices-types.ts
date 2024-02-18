import { PrCustomPrices } from '@prisma/client';

export type TCreatePrice = Pick<PrCustomPrices, 'cartId' | 'price'>;

export type TCreatePricesMany = { pr: TCreatePrice[] };

export type TUpdatePrices = { pr: Partial<TCreatePrice & { id: string }>[] };
