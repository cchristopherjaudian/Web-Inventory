import { NextFunction, Response } from 'express';
import { AuthenticationError } from '../lib/custom-errors/class-errors';
import { IAuthRequest } from '../..';
import { TAccounts } from '../lib/types/accounts-types';
import { AccountStatuses, AccountTypes, PrismaClient } from '@prisma/client';
import { TProfile } from '../lib/types/profile-types';
import TokenService from '../services/token-service';

class AuthMiddleware {
    private _jwt = new TokenService();
    private _db: PrismaClient;

    constructor(db: PrismaClient) {
        this._db = db;
    }

    private async verifyToken(token: string) {
        try {
            if (!token) {
                throw new AuthenticationError();
            }
            const isVerified = await this._jwt.verify(token);
            return isVerified.id;
        } catch (error) {
            throw error;
        }
    }

    public inactiveValidate = async (
        req: IAuthRequest,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const token = req.headers['authorization'];
            const authUser = await this.verifyToken(token as string);

            const account = await this._db.account.findFirst({
                where: {
                    id: authUser,
                    status: AccountStatuses.INACTIVE,
                },
            });

            if (!account) throw new AuthenticationError();

            req.account = (<unknown>account) as TAccounts;
            next();
        } catch (error) {
            next(error);
        } finally {
            await this._db.$disconnect();
        }
    };

    public endUserValidate = async (
        req: IAuthRequest,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const token = req.headers['authorization'];
            const authUser = await this.verifyToken(token as string);

            const profile = await this._db.profile.findFirst({
                where: {
                    account: {
                        id: authUser,
                        status: AccountStatuses.ACTIVE,
                    },
                },
                include: {
                    account: true,
                },
            });
            if (!profile) throw new AuthenticationError();

            req.profile = (<unknown>profile) as TProfile;
            next();
        } catch (error) {
            next(error);
        }
    };

    public adminValidate =
        (roles: AccountTypes[]) =>
        async (req: IAuthRequest, res: Response, next: NextFunction) => {
            try {
                const token = req.headers['authorization'];
                const authUser = await this.verifyToken(token as string);

                const profile = await this._db.profile.findFirst({
                    where: {
                        account: {
                            id: authUser,
                            status: AccountStatuses.ACTIVE,
                        },
                    },
                    include: {
                        account: true,
                    },
                });

                if (!profile) throw new AuthenticationError();
                if (!roles.includes(profile.account.accountType!)) {
                    throw new AuthenticationError();
                }

                req.profile = (<unknown>profile) as TProfile;
                next();
            } catch (error) {
                next(error);
            }
        };
}

export default AuthMiddleware;
