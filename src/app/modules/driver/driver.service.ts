import httpStatus from 'http-status';
import prisma from '../../../shared/prisma';
import { Driver } from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import { generateDriverId } from './driver.utils';

// create Driver
const createDriver = async (data: Driver): Promise<Driver | null> => {
  // generate Driver id
  const driverId = await generateDriverId();

  // set Driver id
  data.driverId = driverId;

  const result = await prisma.driver.create({ data });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Driver');
  }

  return result;
};

// get all Drivers
const getDrivers = async (): Promise<Driver[]> => {
  const result = await prisma.driver.findMany({
    orderBy: {
      driverId: 'asc',
    },
  });

  return result;
};

// get single Driver
const getSingleDriver = async (id: string): Promise<Driver | null> => {
  const result = await prisma.driver.findUnique({
    where: {
      id,
    },
  });

  return result;
};

// update single Driver
const updateDriver = async (
  id: string,
  payload: Partial<Driver>
): Promise<Driver | null> => {
  // check is exist
  const isExist = await prisma.driver.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Driver Not Found');
  }

  const result = await prisma.driver.update({
    where: {
      id,
    },
    data: payload,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update Driver');
  }

  return result;
};

// inactive Driver
const inactiveDriver = async (id: string): Promise<Driver | null> => {
  // check is exist
  const isExist = await prisma.driver.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Driver Not Found');
  }

  const result = await prisma.driver.update({
    where: {
      id,
    },
    data: { isActive: false },
  });

  return result;
};

export const DriverService = {
  createDriver,
  getDrivers,
  getSingleDriver,
  updateDriver,
  inactiveDriver,
};
