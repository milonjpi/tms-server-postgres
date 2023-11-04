import httpStatus from 'http-status';
import prisma from '../../../shared/prisma';
import { Party, Prisma } from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import { generatePartyId } from './party.utils';
import { IPartyFilters } from './party.interface';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { partySearchableFields } from './party.constant';

// create Party
const createParty = async (data: Party): Promise<Party | null> => {
  // generate party id
  const partyId = await generatePartyId();

  // set party id
  data.partyId = partyId;

  const result = await prisma.party.create({ data });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Party');
  }

  return result;
};

// get all Parties
const getParties = async (
  filters: IPartyFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Party[]>> => {
  const { searchTerm, ...filterData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: partySearchableFields.map(field => ({
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

  const whereConditions: Prisma.PartyWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.party.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
  });

  const total = await prisma.party.count({
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

// get single Party
const getSingleParty = async (id: string): Promise<Party | null> => {
  const result = await prisma.party.findUnique({
    where: {
      id,
    },
  });

  return result;
};

// update single Party
const updateParty = async (
  id: string,
  payload: Partial<Party>
): Promise<Party | null> => {
  // check is exist
  const isExist = await prisma.party.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Party Not Found');
  }

  const result = await prisma.party.update({
    where: {
      id,
    },
    data: payload,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update Party');
  }

  return result;
};

// inactive Party
const inactiveParty = async (id: string): Promise<Party | null> => {
  // check is exist
  const isExist = await prisma.party.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Party Not Found');
  }

  const result = await prisma.party.update({
    where: {
      id,
    },
    data: { isActive: false },
  });

  return result;
};

export const PartyService = {
  createParty,
  getParties,
  getSingleParty,
  updateParty,
  inactiveParty,
};
