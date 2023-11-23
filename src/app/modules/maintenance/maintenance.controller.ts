import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { MaintenanceService } from './maintenance.service';
import { Maintenance } from '@prisma/client';
import pick from '../../../shared/pick';
import { maintenanceFilterableFields } from './maintenance.constant';
import { paginationFields } from '../../../constants/pagination';

// create Maintenance
const createMaintenance = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const result = await MaintenanceService.createMaintenance(
    data?.data,
    data?.expenses,
    data?.equipmentUses
  );

  sendResponse<Maintenance>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Maintenance Created Successfully',
    data: result,
  });
});

// get all maintenances
const getMaintenances = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, maintenanceFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await MaintenanceService.getMaintenances(
    filters,
    paginationOptions
  );

  sendResponse<Maintenance[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Maintenances retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

// get single Maintenance
const getSingleMaintenance = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await MaintenanceService.getSingleMaintenance(id);

  sendResponse<Maintenance>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Maintenance retrieved successfully',
    data: result,
  });
});

// update single Maintenance
const updateMaintenance = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await MaintenanceService.updateMaintenance(
    id,
    data?.data,
    data?.expenses,
    data?.equipmentUses
  );

  sendResponse<Maintenance>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Maintenance Updated Successfully',
    data: result,
  });
});

// delete Maintenance
const deleteMaintenance = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await MaintenanceService.deleteMaintenance(id);

  sendResponse<Maintenance>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Maintenance Deleted successfully',
    data: result,
  });
});

export const MaintenanceController = {
  createMaintenance,
  getMaintenances,
  getSingleMaintenance,
  updateMaintenance,
  deleteMaintenance,
};
