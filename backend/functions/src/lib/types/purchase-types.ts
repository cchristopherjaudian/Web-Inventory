import { TCart } from './cart-types';

export type TPurchaseList = {
    profileId: string;
};

export type TCreatePr = {
    products: TCart &
        {
            code?: string;
            profileId: string;
            createdAt?: Date;
            quantity: number;
        }[];
    profileId: string;
};

export type TQuotationList = {
    total: number;
    qty: number;
    group: string;
    dateRequired: Date;
    dateRequested: Date;
};
