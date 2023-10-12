import { PrismaClient } from '@prisma/client';

class Prisma {
    private static _prisma: Prisma;
    private _app;

    private constructor() {
        this._app = new PrismaClient();
    }

    public static get Instance() {
        return this._prisma || new Prisma();
    }

    public get db() {
        return this._app.$extends({
            result: {
                profile: {
                    fullName: {
                        needs: {
                            firstname: true,
                            lastname: true,
                            middlename: true,
                        },
                        compute(profile) {
                            return `${profile.firstname} ${
                                profile.middlename ?? ''
                            } ${profile.lastname}`;
                        },
                    },
                },
            },
        });
    }
}

export type TPrismaClient = typeof Prisma.Instance.db;

export default Prisma;
