import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { DriverService } from './driver.service';
import { Driver } from '@prisma/client';
import pick from '../../../shared/pick';
import { driverFilterableFields } from './driver.constant';
import { paginationFields } from '../../../constants/pagination';

// create Driver
const createDriver = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const result = await DriverService.createDriver(data);

  sendResponse<Driver>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Driver Created Successfully',
    data: result,
  });
});

// get all Drivers
const getDrivers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, driverFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await DriverService.getDrivers(filters, paginationOptions);

  sendResponse<Driver[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Drivers retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

// get single Driver
const getSingleDriver = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await DriverService.getSingleDriver(id);

  sendResponse<Driver>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Driver retrieved successfully',
    data: result,
  });
});

// update single Driver
const updateDriver = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await DriverService.updateDriver(id, data);

  sendResponse<Driver>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Driver Updated Successfully',
    data: result,
  });
});

// inactive Driver
const inactiveDriver = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await DriverService.inactiveDriver(id);

  sendResponse<Driver>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Driver Inactive successfully',
    data: result,
  });
});

export const DriverController = {
  createDriver,
  getDrivers,
  getSingleDriver,
  updateDriver,
  inactiveDriver,
};
