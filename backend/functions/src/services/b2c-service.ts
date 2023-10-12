import { AccountTypes } from '@prisma/client';
import { TAccountsListQuery } from '../lib/types/accounts-types';
import { TPrismaClient } from '../lib/prisma';

class B2cService {
    private _db: TPrismaClient;

    constructor(db: TPrismaClient) {
        this._db = db;
    }

    public async getB2cList(params: TAccountsListQuery) {
        try {
            return await this._db.profile.findMany({
                where: {
                    OR: [
                        {
                            firstname: {
                                search: params?.search,
                            },
                        },
                        {
                            lastname: {
                                search: params?.search,
                            },
                        },
                    ],
                    account: {
                        accountType: AccountTypes.CUSTOMER,
                    },
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
