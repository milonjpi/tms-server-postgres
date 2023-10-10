import prisma from '../../../shared/prisma';

// find Last ID
const findLastId = async (): Promise<string> => {
  const currentId = await prisma.trip.findFirst({
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      tripId: true,
    },
  });

  const splitCurrent = currentId?.tripId?.split('TRP-') || ['', '0'];

  return splitCurrent[1];
};
// generate trip ID
export const generateTripId = async (): Promise<string> => {
  const currentId = parseInt(await findLastId());
  const incrementId = currentId + 1;

  return incrementId?.toString().padStart(8, 'TRP-000000');
};
