import { RouteStatuses } from '@prisma/client';
import { TQueryArgs } from '../..';
import Prisma from '../lib/prisma';
import { TRoutes } from '../lib/types/schedule-types';

class ScheduleRepository {
    private _db = Prisma.Instance.db;

    public async create(payload: TRoutes) {
        try {
            return this._db.routes.create({ data: payload });
        } catch (error) {
            throw error;
        } finally {
            await this._db.$disconnect();
        }
    }

    public async list(params: { status: RouteStatuses }) {
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

    public async update(id: string, payload: Partial<TRoutes>) {
        return await this._db.routes.update({
            where: { id },
            data: payload,
        });
    }

    public async findOne(query: TQueryArgs) {
        return await this._db.profile.findFirst(query);
    }
}

export default ScheduleRepository;
