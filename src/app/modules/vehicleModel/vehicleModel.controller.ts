import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { VehicleModel } from '@prisma/client';
import { ModelService } from './vehicleModel.service';

// create Model
const createModel = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const result = await ModelService.createModel(data);

  sendResponse<VehicleModel>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Model Created Successfully',
    data: result,
  });
});

// get all Models
const getModels = catchAsync(async (req: Request, res: Response) => {
  const result = await ModelService.getModels();

  sendResponse<VehicleModel[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Models retrieved successfully',
    data: result,
  });
});

// get single Model
const getSingleModel = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await ModelService.getSingleModel(id);

  sendResponse<VehicleModel>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Model retrieved successfully',
    data: result,
  });
});

// update single Model
const updateModel = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await ModelService.updateModel(id, data);

  sendResponse<VehicleModel>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Model Updated Successfully',
    data: result,
  });
});

// delete model
const deleteModel = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await ModelService.deleteModel(id);

  sendResponse<VehicleModel>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Model deleted successfully',
    data: result,
  });
});

export const ModelController = {
  createModel,
  getModels,
  getSingleModel,
  updateModel,
  deleteModel,
};
