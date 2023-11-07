import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { Trip } from '@prisma/client';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { TripExpenseService } from './tripExpense.service';
import { tripExpenseFilterableFields } from './tripExpense.constant';

// create Trip Expense
const createExpense = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const result = await TripExpenseService.createExpense(data?.id, data?.data);

  sendResponse<Trip>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Trip Expense Created Successfully',
    data: result,
  });
});

// get Trip expenses
const getTripExpenses = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, tripExpenseFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await TripExpenseService.getTripExpenses(
    filters,
    paginationOptions
  );

  sendResponse<Trip[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Trip Expenses retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

// update  Trip expenses
const updateTripExpense = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await TripExpenseService.updateTripExpense(id, data?.data);

  sendResponse<Trip>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Trip Expense Updated Successfully',
    data: result,
  });
});

// delete Trip expense
const deleteTripExpense = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await TripExpenseService.deleteTripExpense(id);

  sendResponse<Trip>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Trip Expenses Deleted successfully',
    data: result,
  });
});

export const TripExpenseController = {
  createExpense,
  getTripExpenses,
  updateTripExpense,
  deleteTripExpense,
};
