import { z } from 'zod';
import { maintenanceType, workshop } from './maintenance.constant';

const create = z.object({
  body: z.object({
    data: z.object(
      {
        date: z.string({ required_error: 'Date is Required' }),
        vehicleId: z.string({ required_error: 'Vehicle ID is Required' }),
        driverId: z.string().optional(),
        odoMeter: z.number().optional(),
        workshopType: z.enum(workshop as [string, ...string[]], {
          required_error: 'Workshop Type is Required',
        }),
        maintenanceType: z.enum(maintenanceType as [string, ...string[]], {
          required_error: 'Maintenance Type is Required',
        }),
        workshopDetails: z.string().optional(),
        serviceCharge: z.number().optional().default(0),
        remarks: z.string().optional(),
      },
      { required_error: 'Data is Required' }
    ),
    equipmentUses: z.array(
      z.object({
        date: z.string({ required_error: 'Date is required' }),
        vehicleId: z.string({ required_error: 'Vehicle ID is Required' }),
        equipmentTitleId: z.string({
          required_error: 'Equipment Title is required',
        }),
        quantity: z.number({ required_error: 'Quantity is required' }),
        unitPrice: z.number({ required_error: 'Unit Price is required' }),
        totalPrice: z.number({ required_error: 'Total Price is required' }),
        remarks: z.string().optional(),
      })
    ),
    externalEquipmentUses: z.array(
      z.object({
        date: z.string({ required_error: 'Date is required' }),
        vehicleId: z.string({ required_error: 'Vehicle ID is Required' }),
        equipmentTitleId: z.string({
          required_error: 'Equipment Title is required',
        }),
        quantity: z.number({ required_error: 'Quantity is required' }),
        unitPrice: z.number({ required_error: 'Unit Price is required' }),
        totalPrice: z.number({ required_error: 'Total Price is required' }),
        remarks: z.string().optional(),
      })
    ),
  }),
});

const update = z.object({
  body: z.object({
    data: z
      .object({
        date: z.string().optional(),
        vehicleId: z.string().optional(),
        driverId: z.string().optional(),
        odoMeter: z.number().optional(),
        workshopType: z.enum(workshop as [string, ...string[]]).optional(),
        maintenanceType: z
          .enum(maintenanceType as [string, ...string[]])
          .optional(),
        workshopDetails: z.string().optional(),
        serviceCharge: z.number().optional(),
        remarks: z.string().optional(),
      })
      .optional(),
    equipmentUses: z.array(
      z.object({
        date: z.string().optional(),
        vehicleId: z.string().optional(),
        equipmentTitleId: z.string().optional(),
        quantity: z.number().optional(),
        unitPrice: z.number().optional(),
        totalPrice: z.number().optional(),
        remarks: z.string().optional(),
      })
    ),
    externalEquipmentUses: z.array(
      z.object({
        date: z.string().optional(),
        vehicleId: z.string().optional(),
        equipmentTitleId: z.string().optional(),
        quantity: z.number().optional(),
        unitPrice: z.number().optional(),
        totalPrice: z.number().optional(),
        remarks: z.string().optional(),
      })
    ),
  }),
});

export const MaintenanceValidation = {
  create,
  update,
};
