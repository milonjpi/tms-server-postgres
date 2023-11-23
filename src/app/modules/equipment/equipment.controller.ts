import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { Equipment } from '@prisma/client';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { EquipmentService } from './equipment.service';
import { equipmentFilterableFields } from './equipment.constant';

// create equipment
const createEquipment = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const result = await EquipmentService.createEquipment(data);

  sendResponse<Equipment>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Equipment Created Successfully',
    data: result,
  });
});

// get Account heads
const getEquipments = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, equipmentFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await EquipmentService.getEquipments(
    filters,
    paginationOptions
  );

  sendResponse<Equipment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Equipments retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

// update equipment
const updateEquipment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await EquipmentService.updateEquipment(id, data);

  sendResponse<Equipment>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Equipment Updated Successfully',
    data: result,
  });
});

// delete Equipment
const deleteEquipment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await EquipmentService.deleteEquipment(id);

  sendResponse<Equipment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Equipment Deleted successfully',
    data: result,
  });
});

export const EquipmentController = {
  createEquipment,
  getEquipments,
  updateEquipment,
  deleteEquipment,
};
