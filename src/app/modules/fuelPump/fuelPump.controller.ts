import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { FuelPumpService } from './fuelPump.service';
import { FuelPump } from '@prisma/client';
import pick from '../../../shared/pick';
import { fuelPumpFilterableFields } from './fuelPump.constant';
import { paginationFields } from '../../../constants/pagination';

// create Fuel Pump
const createFuelPump = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const result = await FuelPumpService.createFuelPump(data);

  sendResponse<FuelPump>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Fuel Pump Created Successfully',
    data: result,
  });
});

// get all fuel pumps
const getFuelPumps = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, fuelPumpFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await FuelPumpService.getFuelPumps(filters, paginationOptions);

  sendResponse<FuelPump[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Fuel Pumps retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

// get single FuelPump
const getSingleFuelPump = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await FuelPumpService.getSingleFuelPump(id);

  sendResponse<FuelPump>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Fuel Pump retrieved successfully',
    data: result,
  });
});

// update single Fuel Pump
const updateFuelPump = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await FuelPumpService.updateFuelPump(id, data);

  sendResponse<FuelPump>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Fuel Pump Updated Successfully',
    data: result,
  });
});

export const FuelPumpController = {
  createFuelPump,
  getFuelPumps,
  getSingleFuelPump,
  updateFuelPump,
};
