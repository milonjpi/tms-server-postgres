import httpStatus from 'http-status';
import prisma from '../../../shared/prisma';
import { VehicleModel } from '@prisma/client';
import ApiError from '../../../errors/ApiError';

// create model
const createModel = async (
  data: VehicleModel
): Promise<VehicleModel | null> => {
  const result = await prisma.vehicleModel.create({ data });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Model');
  }

  return result;
};

// get all Models
const getModels = async (): Promise<VehicleModel[]> => {
  const result = await prisma.vehicleModel.findMany({
    orderBy: {
      label: 'asc',
    },
  });

  return result;
};

// get single Model
const getSingleModel = async (id: string): Promise<VehicleModel | null> => {
  const result = await prisma.vehicleModel.findUnique({
    where: {
      id,
    },
  });

  return result;
};

// update single Model
const updateModel = async (
  id: string,
  payload: Partial<VehicleModel>
): Promise<VehicleModel | null> => {
  // check is exist
  const isExist = await prisma.vehicleModel.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Model Not Found');
  }

  const result = await prisma.vehicleModel.update({
    where: {
      id,
    },
    data: payload,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update Model');
  }

  return result;
};

// delete Model
const deleteModel = async (id: string): Promise<VehicleModel | null> => {
  // check is exist
  const isExist = await prisma.vehicleModel.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Model Not Found');
  }

  const result = await prisma.vehicleModel.delete({
    where: {
      id,
    },
  });

  return result;
};

export const ModelService = {
  createModel,
  getModels,
  getSingleModel,
  updateModel,
  deleteModel,
};
