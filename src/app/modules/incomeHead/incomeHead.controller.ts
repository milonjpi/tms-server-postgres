import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IncomeHead } from '@prisma/client';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { IncomeHeadService } from './incomeHead.service';
import { incomeHeadFilterableFields } from './incomeHead.constant';

// create income head
const createIncomeHead = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const result = await IncomeHeadService.createIncomeHead(data);

  sendResponse<IncomeHead>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Income Head Created Successfully',
    data: result,
  });
});

// get Income heads
const getIncomeHeads = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, incomeHeadFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await IncomeHeadService.getIncomeHeads(
    filters,
    paginationOptions
  );

  sendResponse<IncomeHead[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Income Heads retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

// update income head
const updateIncomeHead = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await IncomeHeadService.updateIncomeHead(id, data);

  sendResponse<IncomeHead>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Income Head Updated Successfully',
    data: result,
  });
});

export const IncomeHeadController = {
  createIncomeHead,
  getIncomeHeads,
  updateIncomeHead,
};
