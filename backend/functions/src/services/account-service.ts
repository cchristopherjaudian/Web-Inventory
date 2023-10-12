import { AccountStatuses, PrismaClient } from '@prisma/client';
import { TAccounts } from '../lib/types/accounts-types';
import TokenService from './token-service';
import { TPrismaClient } from '../lib/prisma';

class AccountService {
    private _db: TPrismaClient;
    private _token = new TokenService();

    constructor(db: TPrismaClient) {
        this._db = db;
    }

    public async createAccount(payload: Omit<TAccounts, 'status'>) {
        try {
            let newData = false;
            // checks if email exists
            let account = await this._db.account.findFirst({
                where: { email: payload.email },
            });
            if (!account) {
                account = await this._db.account.create({ data: payload });
                newData = true;
            }

            if (account.status === AccountStatuses.INACTIVE) {
                newData = true;
            }

            const token = await this._token.sign(account);
            return {
                token,
                newData,
            };
        } catch (error) {
            throw error;
        }
    }

    public async findAccount(payload: Partial<TAccounts>) {
        try {
            return await this._db.account.findFirst({ where: payload });
        } catch (error) {
            throw error;
        }
    }
}

export default AccountService;
