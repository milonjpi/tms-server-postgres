import httpStatus from 'http-status';
import prisma from '../../../shared/prisma';
import { Party } from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import { generatePartyId } from './party.utils';

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
const getParties = async (): Promise<Party[]> => {
  const result = await prisma.party.findMany({
    orderBy: {
      partyId: 'asc',
    },
  });

  return result;
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
