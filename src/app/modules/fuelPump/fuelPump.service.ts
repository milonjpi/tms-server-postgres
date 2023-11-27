import httpStatus from 'http-status';
import prisma from '../../../shared/prisma';
import { FuelPump, Prisma } from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import { IFuelPumpFilters } from './fuelPump.interface';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { fuelPumpSearchableFields } from './fuelPump.constant';

// create fuel Pump
const createFuelPump = async (data: FuelPump): Promise<FuelPump | null> => {
  const result = await prisma.fuelPump.create({ data });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Fuel Pump');
  }

  return result;
};

// get all uel Pumps
const getFuelPumps = async (
  filters: IFuelPumpFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<FuelPump[]>> => {
  const { searchTerm } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: fuelPumpSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  const whereConditions: Prisma.FuelPumpWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.fuelPump.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
  });

  const total = await prisma.fuelPump.count({
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

// get single Fuel Pump
const getSingleFuelPump = async (id: string): Promise<FuelPump | null> => {
  const result = await prisma.fuelPump.findUnique({
    where: {
      id,
    },
  });

  return result;
};

// update single Fuel Pump
const updateFuelPump = async (
  id: string,
  payload: Partial<FuelPump>
): Promise<FuelPump | null> => {
  // check is exist
  const isExist = await prisma.fuelPump.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Fuel Pump Not Found');
  }

  const result = await prisma.fuelPump.update({
    where: {
      id,
    },
    data: payload,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update Fuel Pump');
  }

  return result;
};

export const FuelPumpService = {
  createFuelPump,
  getFuelPumps,
  getSingleFuelPump,
  updateFuelPump,
};
