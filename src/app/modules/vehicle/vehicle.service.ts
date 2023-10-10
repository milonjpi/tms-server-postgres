import httpStatus from 'http-status';
import prisma from '../../../shared/prisma';
import { Vehicle } from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import { generateVehicleId } from './vehicle.utils';

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
const getVehicles = async (): Promise<Vehicle[]> => {
  const result = await prisma.vehicle.findMany({
    orderBy: {
      vehicleId: 'asc',
    },
  });

  return result;
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
