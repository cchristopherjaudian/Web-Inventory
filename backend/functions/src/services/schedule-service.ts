import { RouteStatuses } from '@prisma/client';
import { TRoutes } from '../lib/types/schedule-types';
import { NotFoundError } from '../lib/custom-errors/class-errors';
import { TQueryArgs } from '../../index';
import { TPrismaClient } from '../lib/prisma';

class ScheduleService {
    private _db: TPrismaClient;

    constructor(db: TPrismaClient) {
        this._db = db;
    }

    public async createSchedule(payload: TRoutes) {
        const hasAdmin = await this._db.profile.findFirst({
            where: { id: payload.adminId! },
        });
        if (!hasAdmin) throw new NotFoundError('Account does not exists.');

        return this._db.routes.create({ data: payload });
    }

    public async scheduleList(params: { status: RouteStatuses }) {
        const query = {
            where: { status: RouteStatuses.ACTIVE },
            include: {
                profile: true,
            },
        } as TQueryArgs;

        if (params.status) {
            query.where.status = params.status;
        }

        return await this._db.routes.findMany(query);
    }

    public async updateSchedule(id: string, payload: Partial<TRoutes>) {
        if (payload?.adminId) {
            const hasAdmin = await this._db.profile.findFirst({
                where: { id: payload.adminId! },
            });

            if (!hasAdmin) throw new NotFoundError('Account does not exists.');
        }

        return await this._db.routes.update({
            where: { id },
            data: payload,
        });
    }
}

export default ScheduleService;
