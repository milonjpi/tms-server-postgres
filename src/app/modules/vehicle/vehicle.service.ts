import httpStatus from 'http-status';
import prisma from '../../../shared/prisma';
import { Prisma, Vehicle } from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import { generateVehicleId } from './vehicle.utils';
import { IVehicleFilters } from './vehicle.interface';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { vehicleSearchableFields } from './vehicle.constant';

// create Vehicle
const createVehicle = async (data: Vehicle): Promise<Vehicle | null> => {
  // generate vehicle id
  const vehicleId = await generateVehicleId();

  // set vehicle id
  data.vehicleId = vehicleId;

  const result = await prisma.vehicle.create({ data });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Vehicle');
  }

  return result;
};

// get all Vehicles
const getVehicles = async (
  filters: IVehicleFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Vehicle[]>> => {
  const { searchTerm, ...filterData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: vehicleSearchableFields.map(field => ({
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

  const whereConditions: Prisma.VehicleWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.vehicle.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
  });

  const total = await prisma.vehicle.count({
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

// get single Vehicle
const getSingleVehicle = async (id: string): Promise<Vehicle | null> => {
  const result = await prisma.vehicle.findUnique({
    where: {
      id,
    },
  });

  return result;
};

// update single Vehicle
const updateVehicle = async (
  id: string,
  payload: Partial<Vehicle>
): Promise<Vehicle | null> => {
  // check is exist
  const isExist = await prisma.vehicle.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Vehicle Not Found');
  }

  const result = await prisma.vehicle.update({
    where: {
      id,
    },
    data: payload,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update Vehicle');
  }

  return result;
};

// inactive Vehicle
const inactiveVehicle = async (id: string): Promise<Vehicle | null> => {
  // check is exist
  const isExist = await prisma.vehicle.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Vehicle Not Found');
  }

  const result = await prisma.vehicle.update({
    where: {
      id,
    },
    data: { isActive: false },
  });

  return result;
};

export const VehicleService = {
  createVehicle,
  getVehicles,
  getSingleVehicle,
  updateVehicle,
  inactiveVehicle,
};
