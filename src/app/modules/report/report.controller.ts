import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { EquipmentTitle, Vehicle } from '@prisma/client';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import {
  reportSummaryFilterableFields,
  stockStatusFilterableFields,
} from './report.constant';
import { ReportService } from './report.service';

// get summary
const getSummaries = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, reportSummaryFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await ReportService.getSummaries(filters, paginationOptions);

  sendResponse<Vehicle[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Summary retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

// get fuel status
const getFuelStatus = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, reportSummaryFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await ReportService.getFuelStatus(filters, paginationOptions);

  sendResponse<Vehicle[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Fuel Status retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

// get stock status
const getStockStatus = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, stockStatusFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await ReportService.getStockStatus(filters, paginationOptions);

  sendResponse<EquipmentTitle[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Stock Status retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const ReportController = {
  getSummaries,
  getFuelStatus,
  getStockStatus,
};
