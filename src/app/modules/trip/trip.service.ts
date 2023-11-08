import httpStatus from 'http-status';
import prisma from '../../../shared/prisma';
import { Prisma, Trip } from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import { generateTripId } from './trip.utils';
import { ITripFilters } from './trip.interface';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { tripSearchableFields } from './trip.constant';

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
const getAllTrips = async (
  filters: ITripFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Trip[]>> => {
  const { searchTerm, minValue, maxValue, ...filterData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: tripSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (minValue) {
    andConditions.push({ tripValue: { gte: Number(minValue) } });
  }

  if (maxValue) {
    andConditions.push({ tripValue: { lte: Number(maxValue) } });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.entries(filterData).map(([field, value]) => ({
        [field]: value === 'true' ? true : value === 'false' ? false : value,
      })),
    });
  }

  const whereConditions: Prisma.TripWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.trip.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
    include: {
      vehicle: true,
      driver: true,
      party: true,
      tripExpenses: {
        include: {
          expenseHead: true,
        },
      },
    },
  });

  const total = await prisma.trip.count({
    where: whereConditions,
  });
  const totalPage = Math.ceil(total / limit);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
    data: result,
  };
};

// get single Trip
const getSingleTrip = async (id: string): Promise<Trip | null> => {
  const result = await prisma.trip.findUnique({
    where: {
      id,
    },
    include: {
      vehicle: true,
      driver: true,
      party: true,
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
  getAllTrips,
  getSingleTrip,
  updateTrip,
  deleteTrip,
};
