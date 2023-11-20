import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { Expense } from '@prisma/client';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { ExpenseService } from './expense.service';
import { expenseFilterableFields } from './expense.constant';

// create Expense
const createExpense = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const result = await ExpenseService.createExpense(data);

  sendResponse<Expense>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Expense Created Successfully',
    data: result,
  });
});

// get expenses
const getExpenses = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, expenseFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await ExpenseService.getExpenses(filters, paginationOptions);

  sendResponse<Expense[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Expenses retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

// update expense
const updateExpense = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await ExpenseService.updateExpense(id, data);

  sendResponse<Expense>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Expense Updated Successfully',
    data: result,
  });
});

// delete expense
const deleteExpense = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await ExpenseService.deleteExpense(id);

  sendResponse<Expense>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Expenses Deleted successfully',
    data: result,
  });
});

export const ExpenseController = {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
};
