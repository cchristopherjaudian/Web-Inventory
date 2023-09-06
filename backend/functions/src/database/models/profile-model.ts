import {
  Table,
  Column,
  CreatedAt,
  AllowNull,
  HasOne,
} from 'sequelize-typescript';
import BaseModel from './base-model';
import Accounts from './accounts-model';

@Table
class Profiles extends BaseModel {
  @Column
  firstname: string;

  @Column
  lastname: string;

  @CreatedAt
  @AllowNull(true)
  middlename: Date;

  @CreatedAt
  @AllowNull(true)
  address: Date;

  @HasOne(() => Accounts, 'accountId')
  account: Accounts;
}

export type TProfiles = Omit<typeof Profiles, 'createdAt' | 'updatedAt' | 'id'>;

export default Profiles;
