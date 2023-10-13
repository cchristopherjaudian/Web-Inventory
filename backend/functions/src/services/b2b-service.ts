import { AccountTypes } from '@prisma/client';
import { TAccountsListQuery } from '../lib/types/accounts-types';
import { TPrismaClient } from '../lib/prisma';

class B2bService {
    private _db: TPrismaClient;

    constructor(db: TPrismaClient) {
        this._db = db;
    }

    public async getB2bList(params: TAccountsListQuery) {
        try {
            return await this._db.profile.findMany({
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
                                email: {
                                    contains: params?.search ?? '',
                                    mode: 'insensitive',
                                },
                            },
                        },
                    ],
                    account: {
                        accountType: AccountTypes.BUSINESS,
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

export default B2bService;
