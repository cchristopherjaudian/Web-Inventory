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
  WH = 'WH',
  LOGI = 'LOGI',
}

export type TAccounts = {
  id?: string;
  username: string;
  password: string;
  status?: AccountStatuses;
  accountType: AccountTypes;
  createdAt?: string;
  updatedAt?: string;
};

// Customers
export type TAccountsListQuery = {
  search?: string;
};

export type AdminAccountTypes = Exclude<TAccounts, 'BUSINESS' | 'CUSTOMER'>;
