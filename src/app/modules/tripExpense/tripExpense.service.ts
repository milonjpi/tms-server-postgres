import httpStatus from 'http-status';
import prisma from '../../../shared/prisma';
import { Prisma, Trip, TripExpense } from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { asyncForEach } from '../../../shared/utils';
import { ITripExpenseFilters } from './tripExpense.interface';
import { tripExpenseSearchableFields } from './tripExpense.constant';

// create Trip Expense
const createExpense = async (data: TripExpense[]): Promise<Trip | null> => {
  const result = await prisma.$transaction(async trans => {
    await asyncForEach(data, async (expense: TripExpense) => {
      await trans.tripExpense.create({
        data: expense,
      });
    });
    return trans.trip.findUnique({ where: { id: data[0]?.tripId } });
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Trip Expense');
  }

  return result;
};

// get all Trip Expenses
const getAllTripExpenses = async (
  filters: ITripExpenseFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<TripExpense[]>> => {
  const { searchTerm, ...filterData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: tripExpenseSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.entries(filterData).map(([field, value]) => ({
        [field]: value === 'true' ? true : value === 'false' ? false : value,
      })),
    });
  }

  const whereConditions: Prisma.TripExpenseWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.tripExpense.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
    include: {
      trip: true,
    },
  });

  const total = await prisma.tripExpense.count({
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

// get single Trip expense
const getSingleTripExpense = async (
  id: string
): Promise<TripExpense | null> => {
  const result = await prisma.tripExpense.findUnique({
    where: {
      id,
    },
    include: {
      trip: true,
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

export const ExpenseService = {
  createExpense,
  getAllTripExpenses,
  getSingleTripExpense,
  updateTrip,
  deleteTrip,
};
