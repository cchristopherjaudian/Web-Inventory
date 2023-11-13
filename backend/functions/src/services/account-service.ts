import bcrypt from 'bcrypt';

import { TAccounts } from '../lib/types/accounts-types';
import TokenService from './token-service';
import { TPrismaClient } from '../lib/prisma';
import {
    BadRequestError,
    NotFoundError,
} from '../lib/custom-errors/class-errors';

class AccountService {
    private _db: TPrismaClient;
    private _token = new TokenService();

    constructor(db: TPrismaClient) {
        this._db = db;
    }

    public async createAccount(payload: Omit<TAccounts, 'status'>) {
        try {
            // checks if username exists
            const account = await this._db.account.findFirst({
                where: { username: payload.username },
            });
            if (account) {
                throw new BadRequestError('Username already exists.');
            }

            payload.password = await bcrypt.hashSync(payload.password, 10);
            const { id, username, status, accountType } =
                await this._db.account.create({
                    data: payload,
                });
            const token = await this._token.sign({
                id,
                username,
                status,
                accountType,
            });
            return {
                token,
                account: { id, username, status, accountType },
            };
        } catch (error) {
            throw error;
        }
    }

    public async login(payload: Omit<TAccounts, 'status'>) {
        try {
            // checks if username exists
            const account = await this._db.account.findFirst({
                where: { username: payload.username },
            });
            if (!account) {
                throw new BadRequestError('Wrong username or password');
            }

            const isPasswordMatched = await bcrypt.compareSync(
                payload.password,
                account.password as string
            );

            if (!isPasswordMatched) {
                throw new BadRequestError('Wrong username or password');
            }

            account.password = '';
            const token = await this._token.sign(account);
            return {
                token,
                account,
            };
        } catch (error) {
            throw error;
        }
    }

    public async findAccount(payload: Partial<TAccounts>) {
        try {
            return this._db.account.findFirst({ where: payload });
        } catch (error) {
            throw error;
        }
    }

    public async forgotPassword({
        username,
        password,
    }: Pick<TAccounts, 'username' | 'password'>) {
        const account = await this._db.account.findFirst({
            where: { username },
        });
        if (!account) throw new NotFoundError('Wrong username');

        password = await bcrypt.hashSync(password, 10);
        return this._db.account.update({
            where: { id: account.id },
            data: { password },
        });
    }
}

export default AccountService;
