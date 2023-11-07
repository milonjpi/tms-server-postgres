import httpStatus from 'http-status';
import prisma from '../../../shared/prisma';
import { ExpenseHead, Prisma } from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import { IExpenseFilters } from './expenseHead.interface';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { expenseHeadSearchableFields } from './expenseHead.constant';

// create expense head
const createExpenseHead = async (
  data: ExpenseHead
): Promise<ExpenseHead | null> => {
  const result = await prisma.expenseHead.create({ data });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create expense head');
  }

  return result;
};

// get all expense heads
const getExpenseHeads = async (
  filters: IExpenseFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ExpenseHead[]>> => {
  const { searchTerm, ...filterData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: expenseHeadSearchableFields.map(field => ({
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

  const whereConditions: Prisma.ExpenseHeadWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.expenseHead.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
  });

  const total = await prisma.expenseHead.count({
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

// update expense head
const updateExpenseHead = async (
  id: string,
  payload: Partial<ExpenseHead>
): Promise<ExpenseHead> => {
  // check is exist
  const isExist = await prisma.expenseHead.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Expense Head Not Found');
  }

  const result = await prisma.expenseHead.update({
    where: {
      id,
    },
    data: payload,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update Expense Head');
  }

  return result;
};

// delete expense head
const deleteExpenseHead = async (id: string): Promise<ExpenseHead> => {
  // check is exist
  const isExist = await prisma.expenseHead.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Expense Head Not Found');
  }

  const result = await prisma.expenseHead.update({
    where: {
      id,
    },
    data: {
      isActive: false,
    },
  });

  return result;
};

export const ExpenseHeadService = {
  createExpenseHead,
  getExpenseHeads,
  updateExpenseHead,
  deleteExpenseHead,
};
