import prisma from '../../../shared/prisma';
import { EquipmentTitle, Prisma, Vehicle } from '@prisma/client';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IReportSummaryFilters, IStockStatusFilters } from './report.interface';

// get summaries
const getSummaries = async (
  filters: IReportSummaryFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Vehicle[]>> => {
  const { startDate, endDate, vehicleId } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];
  const dateAndConditions = [];

  if (startDate) {
    dateAndConditions.push({
      date: {
        gte: new Date(`${startDate}, 00:00:00`),
      },
    });
  }
  if (endDate) {
    dateAndConditions.push({
      date: {
        lte: new Date(`${endDate}, 23:59:59`),
      },
    });
  }

  if (vehicleId) {
    andConditions.push({ id: vehicleId });
  }

  const whereConditions: Prisma.VehicleWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const incomeWhereConditions: Prisma.IncomeWhereInput =
    dateAndConditions.length > 0 ? { AND: dateAndConditions } : {};

  const expenseWhereConditions: Prisma.ExpenseWhereInput =
    dateAndConditions.length > 0 ? { AND: dateAndConditions } : {};

  const maintenanceWhereConditions: Prisma.MaintenanceWhereInput =
    dateAndConditions.length > 0 ? { AND: dateAndConditions } : {};

  const equipUseWhereConditions: Prisma.EquipmentUseWhereInput =
    dateAndConditions.length > 0 ? { AND: dateAndConditions } : {};

  const exEquipUseWhereConditions: Prisma.ExternalEquipmentUseWhereInput =
    dateAndConditions.length > 0 ? { AND: dateAndConditions } : {};

  const paperWorkWhereConditions: Prisma.PaperWorkWhereInput =
    dateAndConditions.length > 0 ? { AND: dateAndConditions } : {};

  const result = await prisma.vehicle.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
    include: {
      incomes: {
        where: incomeWhereConditions,
        select: {
          amount: true,
        },
      },
      expenses: {
        where: expenseWhereConditions,
        select: {
          amount: true,
          miscellaneous: true,
        },
      },
      maintenances: {
        where: maintenanceWhereConditions,
        select: {
          serviceCharge: true,
        },
      },
      equipmentUses: {
        where: equipUseWhereConditions,
        select: {
          totalPrice: true,
        },
      },
      externalEquipmentUses: {
        where: exEquipUseWhereConditions,
        select: {
          totalPrice: true,
        },
      },
      paperWorks: {
        where: paperWorkWhereConditions,
        select: {
          totalAmount: true,
        },
      },
    },
  });

  const total = await prisma.vehicle.count({
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

// get fuel status
const getFuelStatus = async (
  filters: IReportSummaryFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Vehicle[]>> => {
  const { vehicleId } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (vehicleId) {
    andConditions.push({ id: vehicleId });
  }

  const whereConditions: Prisma.VehicleWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.vehicle.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
    include: {
      fuels: {
        select: {
          quantity: true,
          amount: true,
        },
      },
      expenses: {
        where: {
          expenseHead: {
            label: 'Fuel Cost',
          },
        },
        select: {
          unit: true,
          amount: true,
        },
      },
    },
  });

  const total = await prisma.vehicle.count({
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

// get stock status
const getStockStatus = async (
  filters: IStockStatusFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<EquipmentTitle[]>> => {
  const { equipmentId } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (equipmentId) {
    andConditions.push({ id: equipmentId });
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
      equipments: {
        select: {
          quantity: true,
          totalPrice: true,
        },
      },
      equipmentUses: {
        select: {
          quantity: true,
          totalPrice: true,
        },
      },
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

export const ReportService = {
  getSummaries,
  getFuelStatus,
  getStockStatus,
};
