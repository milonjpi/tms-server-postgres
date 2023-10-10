import httpStatus from 'http-status';
import prisma from '../../../shared/prisma';
import { Trip } from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import { generateTripId } from './trip.utils';

// create Trip
const createTrip = async (data: Trip): Promise<Trip | null> => {
  // generate Trip id
  const tripId = await generateTripId();

  // set Trip id
  data.tripId = tripId;

  const result = await prisma.trip.create({ data });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Trip');
  }

  return result;
};

// get all Trips
const getTrips = async (): Promise<Trip[]> => {
  const result = await prisma.trip.findMany({
    orderBy: {
      tripId: 'asc',
    },
  });

  return result;
};

// get single Trip
const getSingleTrip = async (id: string): Promise<Trip | null> => {
  const result = await prisma.trip.findUnique({
    where: {
      id,
    },
  });

  return result;
};

// update single Trip
const updateTrip = async (
  id: string,
  payload: Partial<Trip>
): Promise<Trip | null> => {
  // check is exist
  const isExist = await prisma.trip.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Trip Not Found');
  }

  const result = await prisma.trip.update({
    where: {
      id,
    },
    data: payload,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update Trip');
  }

  return result;
};

// delete Trip
const deleteTrip = async (id: string): Promise<Trip | null> => {
  // check is exist
  const isExist = await prisma.trip.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Trip Not Found');
  }

  const result = await prisma.trip.delete({
    where: {
      id,
    },
  });

  return result;
};

export const TripService = {
  createTrip,
  getTrips,
  getSingleTrip,
  updateTrip,
  deleteTrip,
};
