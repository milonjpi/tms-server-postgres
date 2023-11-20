import httpStatus from 'http-status';
import prisma from '../../../shared/prisma';
import { Prisma, Trip, TripExpense } from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { ITripExpenseFilters } from './tripExpense.interface';
import { tripExpenseSearchableFields } from './tripExpense.constant';

// create Trip Expense
const createExpense = async (
  id: string,
  data: TripExpense[]
): Promise<Trip | null> => {
  const isExist = await prisma.trip.findFirst({
    where: {
      id,
      costing: false,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Trip Not Found');
  }

  const result = await prisma.trip.update({
    where: {
      id,
      costing: false,
    },
    data: {
      costing: true,
      tripExpenses: {
        createMany: {
          data,
        },
      },
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Trip Expense');
  }

  return result;
};

// get Trip Expenses
const getTripExpenses = async (
  filters: ITripExpenseFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Trip[]>> => {
  const { searchTerm, ...filterData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  andConditions.push({
    costing: true,
  });

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

// update Trip Expense
const updateTripExpense = async (
  id: string,
  data: TripExpense[]
): Promise<Trip | null> => {
  const isExist = await prisma.trip.findFirst({
    where: {
      id,
      costing: true,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Trip Not Found');
  }

  const result = await prisma.$transaction(async trans => {
    await trans.trip.update({
      where: {
        id,
        costing: true,
      },
      data: {
        tripExpenses: {
          deleteMany: {},
        },
      },
    });

    return await trans.trip.update({
      where: {
        id,
        costing: true,
      },
      data: {
        tripExpenses: {
          createMany: {
            data,
          },
        },
      },
      include: {
        tripExpenses: {
          include: {
            expenseHead: true,
          },
        },
      },
    });
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update Trip Expense');
  }

  return result;
};

// delete Trip expense
const deleteTripExpense = async (id: string): Promise<Trip | null> => {
  // check is exist
  const isExist = await prisma.trip.findFirst({
    where: {
      id,
      costing: true,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Trip Not Found');
  }

  const result = await prisma.trip.update({
    where: {
      id,
    },
    data: {
      costing: false,
      tripExpenses: {
        deleteMany: {},
      },
    },
    include: {
      tripExpenses: true,
    },
  });

  return result;
};

export const TripExpenseService = {
  createExpense,
  getTripExpenses,
  updateTripExpense,
  deleteTripExpense,
};
