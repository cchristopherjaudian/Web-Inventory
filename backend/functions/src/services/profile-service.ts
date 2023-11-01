import { AccountStatuses, PrismaClient } from '@prisma/client';
import {
    NotFoundError,
    ResourceConflictError,
} from '../lib/custom-errors/class-errors';
import { TProfile } from '../lib/types/profile-types';
import { TPrismaClient } from '../lib/prisma';

class ProfileService {
    private _db: TPrismaClient;

    constructor(db: TPrismaClient) {
        this._db = db;
    }

    public async createProfile(payload: TProfile) {
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
            throw new ResourceConflictError('Email already exists.');
        }

        const hasProfile = await this.getProfile({
            accountId: payload.account?.id,
        });
        if (!hasProfile) throw new NotFoundError('Profile does not exists.');

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
