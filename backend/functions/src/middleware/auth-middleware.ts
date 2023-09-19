import { NextFunction, Response } from 'express';
import { AuthenticationError } from '../lib/custom-errors/class-errors';
import { AccountService, ProfileService, TokenService } from '../services';
import { IAuthRequest } from '../..';
import { TAccounts } from '../lib/types/accounts-types';
import { AccountStatuses, AccountTypes } from '@prisma/client';
import { TProfile } from '../lib/types/profile-types';

class AuthMiddleware {
    private _jwt = new TokenService();
    private _profile = new ProfileService();
    private _account = new AccountService();

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

            const account = await this._account.findAccount({
                id: authUser,
                status: AccountStatuses.INACTIVE,
            } as Partial<TAccounts>);

            if (!account) throw new AuthenticationError();

            req.account = (<unknown>account) as TAccounts;
            next();
        } catch (error) {
            next(error);
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

            const profile = await this._profile.getProfile({
                account: {
                    id: authUser,
                    status: AccountStatuses.ACTIVE,
                },
            } as Partial<TAccounts>);
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

                const profile = await this._profile.getProfile({
                    account: {
                        id: authUser,
                        status: 'ACTIVE',
                    },
                } as Partial<TAccounts>);
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
