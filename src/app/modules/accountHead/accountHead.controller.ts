import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AccountHead } from '@prisma/client';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { AccountHeadService } from './accountHead.service';
import { accountHeadFilterableFields } from './accountHead.constant';

// create account head
const createAccountHead = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const result = await AccountHeadService.createAccountHead(data);

  sendResponse<AccountHead>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Account Head Created Successfully',
    data: result,
  });
});

// get Account heads
const getAccountHeads = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, accountHeadFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await AccountHeadService.getAccountHeads(
    filters,
    paginationOptions
  );

  sendResponse<AccountHead[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Account Heads retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

// update account head
const updateAccountHead = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await AccountHeadService.updateAccountHead(id, data);

  sendResponse<AccountHead>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Account Head Updated Successfully',
    data: result,
  });
});

export const AccountHeadController = {
  createAccountHead,
  getAccountHeads,
  updateAccountHead,
};
