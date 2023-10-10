import httpStatus from 'http-status';
import prisma from '../../../shared/prisma';
import { Brand } from '@prisma/client';
import ApiError from '../../../errors/ApiError';

// create brand
const createBrand = async (data: Brand): Promise<Brand | null> => {
  const result = await prisma.brand.create({ data });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Brand');
  }

  return result;
};

// get all Brands
const getBrands = async (): Promise<Brand[]> => {
  const result = await prisma.brand.findMany({
    orderBy: {
      label: 'asc',
    },
  });

  return result;
};

// get single Brand
const getSingleBrand = async (id: string): Promise<Brand | null> => {
  const result = await prisma.brand.findUnique({
    where: {
      id,
    },
  });

  return result;
};

// update single Brand
const updateBrand = async (
  id: string,
  payload: Partial<Brand>
): Promise<Brand | null> => {
  // check is exist
  const isExist = await prisma.brand.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Brand Not Found');
  }

  const result = await prisma.brand.update({
    where: {
      id,
    },
    data: payload,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update Brand');
  }

  return result;
};

// delete Brand
const deleteBrand = async (id: string): Promise<Brand | null> => {
  // check is exist
  const isExist = await prisma.brand.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Brand Not Found');
  }

  const result = await prisma.brand.delete({
    where: {
      id,
    },
  });

  return result;
};

export const BrandService = {
  createBrand,
  getBrands,
  getSingleBrand,
  updateBrand,
  deleteBrand,
};
