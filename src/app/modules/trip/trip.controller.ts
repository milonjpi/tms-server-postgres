import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { TripService } from './trip.service';
import { Trip } from '@prisma/client';

// create Trip
const createTrip = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const result = await TripService.createTrip(data);

  sendResponse<Trip>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Trip Created Successfully',
    data: result,
  });
});

// get all Trips
const getTrips = catchAsync(async (req: Request, res: Response) => {
  const result = await TripService.getTrips();

  sendResponse<Trip[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Trips retrieved successfully',
    data: result,
  });
});

// get single Trip
const getSingleTrip = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await TripService.getSingleTrip(id);

  sendResponse<Trip>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Trip retrieved successfully',
    data: result,
  });
});

// update single Trip
const updateTrip = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await TripService.updateTrip(id, data);

  sendResponse<Trip>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Trip Updated Successfully',
    data: result,
  });
});

// delete Trip
const deleteTrip = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await TripService.deleteTrip(id);

  sendResponse<Trip>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Trip Deleted successfully',
    data: result,
  });
});

export const TripController = {
  createTrip,
  getTrips,
  getSingleTrip,
  updateTrip,
  deleteTrip,
};
