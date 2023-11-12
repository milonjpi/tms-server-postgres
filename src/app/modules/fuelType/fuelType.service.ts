import httpStatus from 'http-status';
import prisma from '../../../shared/prisma';
import { FuelType } from '@prisma/client';
import ApiError from '../../../errors/ApiError';

// create Fuel Type
const createFuelType = async (data: FuelType): Promise<FuelType | null> => {
  const result = await prisma.fuelType.create({ data });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Fuel Type');
  }

  return result;
};

// get all Fuel Type
const getAllFuelType = async (): Promise<FuelType[]> => {
  const result = await prisma.fuelType.findMany({
    orderBy: {
      label: 'asc',
    },
  });

  return result;
};

// update single Fuel Type
const updateFuelType = async (
  id: string,
  payload: Partial<FuelType>
): Promise<FuelType | null> => {
  // check is exist
  const isExist = await prisma.fuelType.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Fuel Type Not Found');
  }

  const result = await prisma.fuelType.update({
    where: {
      id,
    },
    data: payload,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update Fuel Type');
  }

  return result;
};

export const FuelTypeService = {
  createFuelType,
  getAllFuelType,
  updateFuelType,
};
