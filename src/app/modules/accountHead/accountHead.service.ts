import httpStatus from 'http-status';
import prisma from '../../../shared/prisma';
import { AccountHead, Prisma } from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IAccountHeadFilters } from './accountHead.interface';
import { accountHeadSearchableFields } from './accountHead.constant';

// create account head
const createAccountHead = async (
  data: AccountHead
): Promise<AccountHead | null> => {
  const result = await prisma.accountHead.create({ data });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create account head');
  }

  return result;
};

// get all account heads
const getAccountHeads = async (
  filters: IAccountHeadFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<AccountHead[]>> => {
  const { searchTerm, ...filterData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: accountHeadSearchableFields.map(field => ({
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

  const whereConditions: Prisma.AccountHeadWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.accountHead.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
  });

  const total = await prisma.accountHead.count({
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

// update account head
const updateAccountHead = async (
  id: string,
  payload: Partial<AccountHead>
): Promise<AccountHead> => {
  // check is exist
  const isExist = await prisma.accountHead.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Account Head Not Found');
  }

  const result = await prisma.accountHead.update({
    where: {
      id,
    },
    data: payload,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update Account Head');
  }

  return result;
};

export const AccountHeadService = {
  createAccountHead,
  getAccountHeads,
  updateAccountHead,
};
