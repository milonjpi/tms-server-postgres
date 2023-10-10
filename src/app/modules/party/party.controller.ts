import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { PartyService } from './party.service';
import { Party } from '@prisma/client';

// create Party
const createParty = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const result = await PartyService.createParty(data);

  sendResponse<Party>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Party Created Successfully',
    data: result,
  });
});

// get all Parties
const getParties = catchAsync(async (req: Request, res: Response) => {
  const result = await PartyService.getParties();

  sendResponse<Party[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Parties retrieved successfully',
    data: result,
  });
});

// get single Party
const getSingleParty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await PartyService.getSingleParty(id);

  sendResponse<Party>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Party retrieved successfully',
    data: result,
  });
});

// update single Party
const updateParty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await PartyService.updateParty(id, data);

  sendResponse<Party>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Party Updated Successfully',
    data: result,
  });
});

// inactive Party
const inactiveParty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await PartyService.inactiveParty(id);

  sendResponse<Party>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Party Inactive successfully',
    data: result,
  });
});

export const PartyController = {
  createParty,
  getParties,
  getSingleParty,
  updateParty,
  inactiveParty,
};
