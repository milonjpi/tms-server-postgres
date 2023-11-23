import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { EquipmentTitle } from '@prisma/client';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { EquipmentTitleService } from './equipmentTitle.service';
import { equipmentTitleFilterableFields } from './equipmentTitle.constant';

// create equipment title
const createEquipmentTitle = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const result = await EquipmentTitleService.createEquipmentTitle(data);

  sendResponse<EquipmentTitle>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Equipment Title Created Successfully',
    data: result,
  });
});

// get Account heads
const getEquipmentTitles = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, equipmentTitleFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await EquipmentTitleService.getEquipmentTitles(
    filters,
    paginationOptions
  );

  sendResponse<EquipmentTitle[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Equipment Titles retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

// update equipment title
const updateEquipmentTitle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await EquipmentTitleService.updateEquipmentTitle(id, data);

  sendResponse<EquipmentTitle>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Equipment Title Updated Successfully',
    data: result,
  });
});

export const EquipmentTitleController = {
  createEquipmentTitle,
  getEquipmentTitles,
  updateEquipmentTitle,
};
