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
  id?: string;
  email: string;
  status?: AccountStatuses;
  accountType: AccountTypes;
  createdAt?: string;
  updatedAt?: string;
};

// Customers
export type TCustomerListQuery = {
  search?: string;
  status?: string;
};

export type AdminAccountTypes = Exclude<TAccounts, 'BUSINESS' | 'CUSTOMER'>;
