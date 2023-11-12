import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { Uom } from '@prisma/client';
import { UomService } from './uom.service';

// create Uom
const createUom = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const result = await UomService.createUom(data);

  sendResponse<Uom>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Uom Created Successfully',
    data: result,
  });
});

// get all Uom
const getAllUom = catchAsync(async (req: Request, res: Response) => {
  const result = await UomService.getAllUom();

  sendResponse<Uom[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Uom retrieved successfully',
    data: result,
  });
});

// update single Uom
const updateUom = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await UomService.updateUom(id, data);

  sendResponse<Uom>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Uom Updated Successfully',
    data: result,
  });
});

export const UomController = {
  createUom,
  getAllUom,
  updateUom,
};
