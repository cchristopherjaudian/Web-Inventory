import { AccountTypes } from '@prisma/client';
import { TPrismaClient } from '../lib/prisma';
import { TAccountsListQuery } from '../lib/types/accounts-types';

class AdminService {
    private _db: TPrismaClient;

    constructor(db: TPrismaClient) {
        this._db = db;
    }

    public async getAdminList(params: TAccountsListQuery) {
        try {
            return this._db.profile.findMany({
                where: {
                    OR: [
                        {
                            firstname: {
                                contains: params?.search ?? '',
                                mode: 'insensitive',
                            },
                        },
                        {
                            lastname: {
                                contains: params?.search ?? '',
                                mode: 'insensitive',
                            },
                        },
                        {
                            account: {
                                username: {
                                    contains: params?.search ?? '',
                                    mode: 'insensitive',
                                },
                            },
                        },
                    ],
                    account: {
                        accountType: {
                            in: [AccountTypes.SUB_1, AccountTypes.SUB_2],
                        },
                    },
                },
            });
        } catch (error) {
            throw error;
        }
    }
}

export default AdminService;
