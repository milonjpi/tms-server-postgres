import prisma from '../../../shared/prisma';

// find Last ID
const findLastId = async (): Promise<string> => {
  const currentId = await prisma.vehicle.findFirst({
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      vehicleId: true,
    },
  });

  const splitCurrent = currentId?.vehicleId?.split('VHL-') || ['', '0'];

  return splitCurrent[1];
};
// generate vehicle ID
export const generateVehicleId = async (): Promise<string> => {
  const currentId = parseInt(await findLastId());
  const incrementId = currentId + 1;

  return incrementId?.toString().padStart(6, 'VHL-000000');
};
