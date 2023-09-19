import { RouteStatuses } from '@prisma/client';
import { TRoutes } from '../lib/types/schedule-types';
import ScheduleRepository from '../repositories/schedule-repository';
import { NotFoundError } from '../lib/custom-errors/class-errors';

class ScheduleService {
    private _repo = new ScheduleRepository();

    public async createSchedule(payload: TRoutes) {
        const hasAdmin = await this._repo.findOne({
            where: { id: payload.adminId! },
        });
        if (!hasAdmin) throw new NotFoundError('Account does not exists.');

        return await this._repo.create(payload);
    }

    public async scheduleList(params: { status: RouteStatuses }) {
        return await this._repo.list(params);
    }

    public async updateSchedule(id: string, payload: Partial<TRoutes>) {
        if (payload?.adminId) {
            const hasAdmin = await this._repo.findOne({
                where: { id: payload.adminId! },
            });

            if (!hasAdmin) throw new NotFoundError('Account does not exists.');
        }

        return await this._repo.update(id, payload);
    }
}

export default ScheduleService;
