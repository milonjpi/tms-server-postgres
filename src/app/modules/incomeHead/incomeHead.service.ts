import httpStatus from 'http-status';
import prisma from '../../../shared/prisma';
import { IncomeHead, Prisma } from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IIncomeHeadFilters } from './incomeHead.interface';
import { incomeHeadSearchableFields } from './incomeHead.constant';

// create income head
const createIncomeHead = async (
  data: IncomeHead
): Promise<IncomeHead | null> => {
  const result = await prisma.incomeHead.create({ data });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create income head');
  }

  return result;
};

// get all income heads
const getIncomeHeads = async (
  filters: IIncomeHeadFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IncomeHead[]>> => {
  const { searchTerm, ...filterData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: incomeHeadSearchableFields.map(field => ({
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
        [field]: value,
      })),
    });
  }

  const whereConditions: Prisma.IncomeHeadWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.incomeHead.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
  });

  const total = await prisma.incomeHead.count({
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

// update income head
const updateIncomeHead = async (
  id: string,
  payload: Partial<IncomeHead>
): Promise<IncomeHead> => {
  // check is exist
  const isExist = await prisma.incomeHead.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Income Head Not Found');
  }

  const result = await prisma.incomeHead.update({
    where: {
      id,
    },
    data: payload,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update Income Head');
  }

  return result;
};

export const IncomeHeadService = {
  createIncomeHead,
  getIncomeHeads,
  updateIncomeHead,
};
