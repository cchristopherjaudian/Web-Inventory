import { TAccounts } from './accounts-types';

export type TProfile = {
    id?: string;
    firstname: string;
    lastname: string;
    middlename?: string;
    address: string;
    createdAt?: string;
    updatedAt?: string;
    emailAddress: string;
    accountId?: string;

    account: TAccounts;
};
