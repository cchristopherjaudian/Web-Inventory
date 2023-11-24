import { AccountStatuses } from '@prisma/client';
import bcrypt from 'bcrypt';
import {
    NotFoundError,
    ResourceConflictError,
} from '../lib/custom-errors/class-errors';
import { TCheckExists, TProfile } from '../lib/types/profile-types';
import { TPrismaClient } from '../lib/prisma';

class ProfileService {
    private _db: TPrismaClient;

    constructor(db: TPrismaClient) {
        this._db = db;
    }

    public async createProfile(payload: TProfile) {
        const emailExists = await this._db.profile.findFirst({
            select: { emailAddress: true },
            where: { emailAddress: payload.emailAddress },
        });
        if (emailExists) {
            throw new ResourceConflictError('Email already exists.');
        }

        const [account, profile] = await Promise.all([
            this._db.account.update({
                where: { id: payload.account.id },
                data: {
                    status: AccountStatuses.ACTIVE,
                },
            }),
            this._db.profile.create({
                data: {
                    ...payload,
                    account: {
                        connect: {
                            id: payload.account.id,
                        },
                    },
                } as any,
            }),
        ]);

        return {
            account,
            profile,
        };
    }

    public async checkExisting(payload: TCheckExists) {
        const hasEmail = await this._db.profile.findFirst({
            select: { emailAddress: true },
            where: { emailAddress: payload.email },
        });
        if (hasEmail) {
            throw new ResourceConflictError('Email already exists.');
        }

        const hasUsername = await this._db.account.findFirst({
            select: { username: true },
            where: { username: payload.username },
        });
        if (hasUsername) {
            throw new ResourceConflictError('Contact already exists.');
        }

        return {
            valid: true,
        };
    }

    public async createFullProfile(payload: TProfile) {
        const hasEmail = await this._db.profile.findFirst({
            select: { emailAddress: true },
            where: { emailAddress: payload.emailAddress },
        });
        if (hasEmail) {
            throw new ResourceConflictError('Account already exists.');
        }

        const hasUsername = await this._db.account.findFirst({
            select: { username: true },
            where: { username: payload.account.username },
        });
        if (hasUsername) {
            throw new ResourceConflictError('Account already exists.');
        }
        const { account, ...profile } = payload;

        account.password = await bcrypt.hashSync(account.password, 10);
        const newUser = await this._db.account.create({
            data: {
                ...account,
                status: AccountStatuses.ACTIVE,
                Profile: {
                    create: {
                        ...profile,
                    },
                },
            },
        });

        return newUser;
    }

    public async getProfile(payload: Partial<TProfile>) {
        const profile = await this._db.profile.findFirst({
            where: payload,
            include: {
                account: true,
            },
        });
        return profile;
    }

    public async updateProfile(payload: Partial<TProfile>) {
        let hasAccount;
        if (payload.account?.username) {
            hasAccount = await this._db.account.findFirst({
                where: {
                    username: payload.account.username,
                },
            });
        }
        if (hasAccount) {
            throw new ResourceConflictError('Username already exists.');
        }

        const hasProfile = await this.getProfile({
            accountId: payload.account?.id,
        });
        if (!hasProfile) throw new NotFoundError('Profile does not exists.');

        let hasEmail;
        if (payload.emailAddress) {
            hasEmail = await this.getProfile({
                emailAddress: payload.emailAddress,
            });
        }
        if (hasEmail) {
            throw new ResourceConflictError('Email already exists.');
        }
        payload.id = hasProfile.id;
        const updateProfile = await this._db.profile.update({
            where: { id: payload?.id },
            include: {
                account: true,
            },
            data: {
                ...payload,
                account: {
                    update: {
                        data: {
                            ...payload.account,
                        },
                    },
                } as any,
            },
        });
        return updateProfile;
    }
}

export default ProfileService;
