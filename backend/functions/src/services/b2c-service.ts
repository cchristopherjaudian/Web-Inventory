import { AccountTypes, PrismaClient } from '@prisma/client';
import { TAccountsListQuery } from '../lib/types/accounts-types';
import { TQueryArgs } from '../../index';

class B2cService {
    private _db: PrismaClient;

    constructor(db: PrismaClient) {
        this._db = db;
    }

    public async getB2cList(params: TAccountsListQuery) {
        try {
            const query = {
                where: {
                    account: {
                        accountType: AccountTypes.CUSTOMER,
                    },
                },
            } as TQueryArgs;

            if (params?.search) {
                query.where!.account.email = {
                    contains: params.search,
                };
            }

            if (params?.status) {
                query.where!.account.status = params.status;
            }

            return await this._db.profile.findMany({
                where: {
                    ...query.where,
                },
                include: {
                    account: true,
                },
            });
        } catch (error) {
            throw error;
        }
    }
}

export default B2cService;
