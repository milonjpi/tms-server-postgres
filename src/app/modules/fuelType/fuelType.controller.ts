import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { FuelType } from '@prisma/client';
import { FuelTypeService } from './fuelType.service';

// create Fuel Type
const createFuelType = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const result = await FuelTypeService.createFuelType(data);

  sendResponse<FuelType>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Fuel Type Created Successfully',
    data: result,
  });
});

// get all Fuel Type
const getAllFuelType = catchAsync(async (req: Request, res: Response) => {
  const result = await FuelTypeService.getAllFuelType();

  sendResponse<FuelType[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Fuel Types retrieved successfully',
    data: result,
  });
});

// update single Fuel Type
const updateFuelType = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await FuelTypeService.updateFuelType(id, data);

  sendResponse<FuelType>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Fuel Type Updated Successfully',
    data: result,
  });
});

export const FuelTypeController = {
  createFuelType,
  getAllFuelType,
  updateFuelType,
};
