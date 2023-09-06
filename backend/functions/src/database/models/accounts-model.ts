import { Table, Column, DataType } from 'sequelize-typescript';
import BaseModel from './base-model';
import { AccountStatuses, AccountTypes } from '../../lib/types/accounts-types';

@Table
class Accounts extends BaseModel {
  @Column
  email: string;

  @Column
  password: string;

  @Column({
    type: DataType.ENUM(...Object.values(AccountStatuses)),
  })
  status: string;

  @Column({
    type: DataType.ENUM(...Object.values(AccountTypes)),
  })
  accountType: string;
}

export type TAccountsModel = Omit<
  typeof Accounts,
  'createdAt' | 'updatedAt' | 'id'
>;

export default Accounts;
