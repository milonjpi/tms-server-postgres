import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { FuelService } from './fuel.service';
import { Fuel } from '@prisma/client';
import pick from '../../../shared/pick';
import { fuelFilterableFields } from './fuel.constant';
import { paginationFields } from '../../../constants/pagination';

// create Fuel
const createFuel = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const result = await FuelService.createFuel(data);

  sendResponse<Fuel>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Fuel Created Successfully',
    data: result,
  });
});

// get all fuels
const getFuels = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, fuelFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await FuelService.getFuels(filters, paginationOptions);

  sendResponse<Fuel[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Fuels retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

// get single Fuel
const getSingleFuel = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await FuelService.getSingleFuel(id);

  sendResponse<Fuel>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Fuel retrieved successfully',
    data: result,
  });
});

// update single Fuel
const updateFuel = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await FuelService.updateFuel(id, data);

  sendResponse<Fuel>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Fuel Updated Successfully',
    data: result,
  });
});

// delete Fuel
const deleteFuel = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await FuelService.deleteFuel(id);

  sendResponse<Fuel>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Fuel Deleted successfully',
    data: result,
  });
});

export const FuelController = {
  createFuel,
  getFuels,
  getSingleFuel,
  updateFuel,
  deleteFuel,
};
