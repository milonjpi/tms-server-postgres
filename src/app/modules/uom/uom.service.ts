import httpStatus from 'http-status';
import prisma from '../../../shared/prisma';
import { Uom } from '@prisma/client';
import ApiError from '../../../errors/ApiError';

// create Uom
const createUom = async (data: Uom): Promise<Uom | null> => {
  const result = await prisma.uom.create({ data });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Uom');
  }

  return result;
};

// get all Uom
const getAllUom = async (): Promise<Uom[]> => {
  const result = await prisma.uom.findMany({
    orderBy: {
      label: 'asc',
    },
  });

  return result;
};

// update single Uom
const updateUom = async (
  id: string,
  payload: Partial<Uom>
): Promise<Uom | null> => {
  // check is exist
  const isExist = await prisma.uom.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Uom Not Found');
  }

  const result = await prisma.uom.update({
    where: {
      id,
    },
    data: payload,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update Uom');
  }

  return result;
};

export const UomService = {
  createUom,
  getAllUom,
  updateUom,
};
