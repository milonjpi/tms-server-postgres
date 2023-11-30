import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AccidentHistory } from '@prisma/client';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { AccidentHistoryService } from './accidentHistory.service';
import { accidentHistoryFilterableFields } from './accidentHistory.constant';

// create accident history
const createAccidentHistory = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;

    const result = await AccidentHistoryService.createAccidentHistory(data);

    sendResponse<AccidentHistory>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Accident History Created Successfully',
      data: result,
    });
  }
);

// get accident history
const getAccidentHistories = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, accidentHistoryFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AccidentHistoryService.getAccidentHistories(
    filters,
    paginationOptions
  );

  sendResponse<AccidentHistory[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Accident History retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

// update accident history
const updateAccidentHistory = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;

    const result = await AccidentHistoryService.updateAccidentHistory(id, data);

    sendResponse<AccidentHistory>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Accident history Updated Successfully',
      data: result,
    });
  }
);

// delete accident history
const deleteAccidentHistory = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await AccidentHistoryService.deleteAccidentHistory(id);

    sendResponse<AccidentHistory>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Accident History Deleted successfully',
      data: result,
    });
  }
);

export const AccidentHistoryController = {
  createAccidentHistory,
  getAccidentHistories,
  updateAccidentHistory,
  deleteAccidentHistory,
};
