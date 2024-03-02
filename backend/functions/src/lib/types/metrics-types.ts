import { AccountTypes, OrderStatuses } from '@prisma/client';

export type TGroupedQuantity = { _sum: { quantity: number } }[];

export type TRptListQuery = {
  status?: OrderStatuses;
  startsAt?: string;
  endsAt?: string;
  account?: AccountTypes;
};

export type TMappedRptPayload = {
  list: Record<string, any>[];
  sales: number;
};
