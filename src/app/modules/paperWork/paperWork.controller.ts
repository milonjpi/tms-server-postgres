import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { PaperWorkService } from './paperWork.service';
import { PaperWork } from '@prisma/client';
import pick from '../../../shared/pick';
import { paperWorkFilterableFields } from './paperWork.constant';
import { paginationFields } from '../../../constants/pagination';

// create Paper Work
const createPaperWork = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const result = await PaperWorkService.createPaperWork(data);

  sendResponse<PaperWork>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Document Created Successfully',
    data: result,
  });
});

// get all paper Works
const getPaperWorks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, paperWorkFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await PaperWorkService.getPaperWorks(
    filters,
    paginationOptions
  );

  sendResponse<PaperWork[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Document retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

// update single Paper Work
const updatePaperWork = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await PaperWorkService.updatePaperWork(id, data);

  sendResponse<PaperWork>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Document Updated Successfully',
    data: result,
  });
});

// delete Paper Work
const deletePaperWork = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await PaperWorkService.deletePaperWork(id);

  sendResponse<PaperWork>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Document Deleted successfully',
    data: result,
  });
});

export const PaperWorkController = {
  createPaperWork,
  getPaperWorks,
  updatePaperWork,
  deletePaperWork,
};
