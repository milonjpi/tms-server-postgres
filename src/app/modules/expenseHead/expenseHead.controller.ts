import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { ExpenseHead } from '@prisma/client';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { ExpenseHeadService } from './expenseHead.service';
import { expenseHeadFilterableFields } from './expenseHead.constant';

// create expense head
const createExpenseHead = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const result = await ExpenseHeadService.createExpenseHead(data);

  sendResponse<ExpenseHead>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Expense Head Created Successfully',
    data: result,
  });
});

// get Expense heads
const getExpenseHeads = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, expenseHeadFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await ExpenseHeadService.getExpenseHeads(
    filters,
    paginationOptions
  );

  sendResponse<ExpenseHead[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Expense Heads retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

// update expense head
const updateExpenseHead = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await ExpenseHeadService.updateExpenseHead(id, data);

  sendResponse<ExpenseHead>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Expense Head Updated Successfully',
    data: result,
  });
});

export const ExpenseHeadController = {
  createExpenseHead,
  getExpenseHeads,
  updateExpenseHead,
};
