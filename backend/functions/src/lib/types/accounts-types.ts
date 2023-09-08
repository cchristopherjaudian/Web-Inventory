export enum AccountStatuses {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum AccountTypes {
  BUSINESS = 'BUSINESS',
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN',
  SUB_1 = 'SUB_1',
  SUB_2 = 'SUB_2',
}

export type TAccounts = {
  email: string;
  password: string;
  status: AccountStatuses;
  accountType: AccountTypes;
};
