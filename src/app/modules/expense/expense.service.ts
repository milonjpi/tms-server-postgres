import httpStatus from 'http-status';
import prisma from '../../../shared/prisma';
import { Expense, Prisma } from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IExpenseFilters } from './expense.interface';
import { expenseSearchableFields } from './expense.constant';

// create Expense
const createExpense = async (data: Expense): Promise<Expense | null> => {
  const result = await prisma.expense.create({
    data,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Expense');
  }

  return result;
};

// get all expenses
const getExpenses = async (
  filters: IExpenseFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Expense[]>> => {
  const { searchTerm, startDate, endDate, ...filterData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: expenseSearchableFields.map(field => ({
        [field]: {
          contains: field === 'amount' ? Number(searchTerm) : searchTerm,
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
        [field]: value === 'true' ? true : value === 'false' ? false : value,
      })),
    });
  }

  const whereConditions: Prisma.ExpenseWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.expense.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
    include: {
      vehicle: true,
      expenseHead: true,
    },
  });

  const total = await prisma.expense.count({
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

// update single Expense
const updateExpense = async (
  id: string,
  payload: Partial<Expense>
): Promise<Expense | null> => {
  // check is exist
  const isExist = await prisma.expense.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Expense Not Found');
  }

  const result = await prisma.expense.update({
    where: {
      id,
    },
    data: payload,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update Expense');
  }

  return result;
};

// delete Expense
const deleteExpense = async (id: string): Promise<Expense | null> => {
  // check is exist
  const isExist = await prisma.expense.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Expense Not Found');
  }

  const result = await prisma.expense.delete({
    where: {
      id,
    },
  });

  return result;
};

export const ExpenseService = {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
};
