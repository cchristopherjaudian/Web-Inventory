import httpStatus from 'http-status';
import ResponseObject from '../lib/response-object';
import { catchAsync } from '../helpers/catch-async';
import ResponseCodes from '../../commons/response-codes';
import ScheduleService from '../services/schedule-service';
import { RouteStatuses } from '@prisma/client';

const delivery = new ScheduleService();
const response = new ResponseObject();

const createSchedule = catchAsync(async (req, res) => {
    const newSchedule = await delivery.createSchedule(req.body);
    response.createResponse(
        res,
        httpStatus.OK,
        ResponseCodes.DATA_CREATED,
        newSchedule
    );
});

const schedules = catchAsync(async (req, res) => {
    const schedules = await delivery.scheduleList(
        req.query as { status: RouteStatuses }
    );
    response.createResponse(
        res,
        httpStatus.OK,
        ResponseCodes.LIST_RETRIEVED,
        schedules
    );
});

const updateSchedule = catchAsync(async (req, res) => {
    const updated = await delivery.updateSchedule(
        req.params.scheduleId,
        req.body
    );
    response.createResponse(
        res,
        httpStatus.OK,
        ResponseCodes.DATA_MODIFIED,
        updated
    );
});

export default { createSchedule, schedules, updateSchedule };
