import httpStatus from 'http-status';
import prisma from '../../../shared/prisma';
import { EquipmentTitle, Prisma } from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IEquipmentTitleFilters } from './equipmentTitle.interface';
import { equipmentTitleSearchableFields } from './equipmentTitle.constant';

// create equipment title
const createEquipmentTitle = async (
  data: EquipmentTitle
): Promise<EquipmentTitle | null> => {
  const result = await prisma.equipmentTitle.create({ data });

  if (!result) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Failed to create equipment title'
    );
  }

  return result;
};

// get all equipment titles
const getEquipmentTitles = async (
  filters: IEquipmentTitleFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<EquipmentTitle[]>> => {
  const { searchTerm, ...filterData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: equipmentTitleSearchableFields.map(field => ({
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
        [field]: value,
      })),
    });
  }

  const whereConditions: Prisma.EquipmentTitleWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.equipmentTitle.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
    include: {
      uom: true,
    },
  });

  const total = await prisma.equipmentTitle.count({
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

// update equipment title
const updateEquipmentTitle = async (
  id: string,
  payload: Partial<EquipmentTitle>
): Promise<EquipmentTitle> => {
  // check is exist
  const isExist = await prisma.equipmentTitle.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Equipment Title Not Found');
  }

  const result = await prisma.equipmentTitle.update({
    where: {
      id,
    },
    data: payload,
  });

  if (!result) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Failed to Update Equipment Title'
    );
  }

  return result;
};

export const EquipmentTitleService = {
  createEquipmentTitle,
  getEquipmentTitles,
  updateEquipmentTitle,
};
