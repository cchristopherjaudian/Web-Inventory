import { RouteStatuses } from '@prisma/client';
import { TRoutes } from '../lib/types/schedule-types';
import { TQueryArgs } from '../../index';
import { TPrismaClient } from '../lib/prisma';

class ScheduleService {
  private _db: TPrismaClient;

  constructor(db: TPrismaClient) {
    this._db = db;
  }

  public async createSchedule(payload: TRoutes) {
    return this._db.routes.create({ data: payload });
  }

  public async scheduleList(params: { status: RouteStatuses }) {
    const query = {
      where: { status: RouteStatuses.ACTIVE },
    } as TQueryArgs;

    if (params.status) {
      query.where.status = params.status;
    }

    return this._db.routes.findMany(query);
  }

  public async updateSchedule(id: string, payload: Partial<TRoutes>) {
    return this._db.routes.update({
      where: { id },
      data: payload,
    });
  }
}

export default ScheduleService;
