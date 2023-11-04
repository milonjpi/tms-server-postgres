import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { Vehicle } from '@prisma/client';
import { VehicleService } from './vehicle.service';
import pick from '../../../shared/pick';
import { vehicleFilterableFields } from './vehicle.constant';
import { paginationFields } from '../../../constants/pagination';

// create Vehicle
const createVehicle = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const result = await VehicleService.createVehicle(data);

  sendResponse<Vehicle>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Vehicle Created Successfully',
    data: result,
  });
});

// get all Vehicles
const getVehicles = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, vehicleFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await VehicleService.getVehicles(filters, paginationOptions);

  sendResponse<Vehicle[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Vehicles retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

// get single Vehicle
const getSingleVehicle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await VehicleService.getSingleVehicle(id);

  sendResponse<Vehicle>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Vehicle retrieved successfully',
    data: result,
  });
});

// update single Vehicle
const updateVehicle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await VehicleService.updateVehicle(id, data);

  sendResponse<Vehicle>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Vehicle Updated Successfully',
    data: result,
  });
});

// inactive Vehicle
const inactiveVehicle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await VehicleService.inactiveVehicle(id);

  sendResponse<Vehicle>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Vehicle Inactive successfully',
    data: result,
  });
});

export const VehicleController = {
  createVehicle,
  getVehicles,
  getSingleVehicle,
  updateVehicle,
  inactiveVehicle,
};
