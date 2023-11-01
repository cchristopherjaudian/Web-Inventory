import { TCart } from './cart-types';

export type TPurchaseList = {
    profileId: string;
};

export type TCreatePr = {
    products: TCart & { code?: string; profileId: string; createdAt?: Date }[];
    profileId: string;
};
