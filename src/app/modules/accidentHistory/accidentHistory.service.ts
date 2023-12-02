import httpStatus from 'http-status';
import prisma from '../../../shared/prisma';
import { AccidentHistory, Prisma } from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IAccidentHistoryFilters } from './accidentHistory.interface';
import { accidentHistorySearchableFields } from './accidentHistory.constant';

// create accident history
const createAccidentHistory = async (
  data: AccidentHistory
): Promise<AccidentHistory | null> => {
  const result = await prisma.accidentHistory.create({ data });

  if (!result) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Failed to create accident history'
    );
  }

  return result;
};

// get all accident histories
const getAccidentHistories = async (
  filters: IAccidentHistoryFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<AccidentHistory[]>> => {
  const { searchTerm, startDate, endDate, ...filterData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: accidentHistorySearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (startDate) {
    andConditions.push({
      date: {
        gte: new Date(`${startDate}, 00:00:00`),
      },
    });
  }

  if (endDate) {
    andConditions.push({
      date: {
        lte: new Date(`${endDate}, 23:59:59`),
      },
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereConditions: Prisma.AccidentHistoryWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.accidentHistory.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
    include: {
      vehicle: true,
      driver: true,
    },
  });

  const total = await prisma.accidentHistory.count({
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

// update accident history
const updateAccidentHistory = async (
  id: string,
  payload: Partial<AccidentHistory>
): Promise<AccidentHistory | null> => {
  // check is exist
  const isExist = await prisma.accidentHistory.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Accident history Not Found');
  }

  const result = await prisma.accidentHistory.update({
    where: {
      id,
    },
    data: payload,
  });

  if (!result) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Failed to Update accident history'
    );
  }

  return result;
};

// delete accident history
const deleteAccidentHistory = async (
  id: string
): Promise<AccidentHistory | null> => {
  // check is exist
  const isExist = await prisma.accidentHistory.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Accident History Not Found');
  }

  const result = await prisma.accidentHistory.delete({
    where: {
      id,
    },
  });

  return result;
};

export const AccidentHistoryService = {
  createAccidentHistory,
  getAccidentHistories,
  updateAccidentHistory,
  deleteAccidentHistory,
};
