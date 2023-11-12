import { z } from 'zod';

const create = z.object({
  body: z.object({
    vehicleId: z.string({ required_error: 'Vehicle ID is Required' }),
    date: z.string({ required_error: 'Date is Required' }),
    fuelTypeId: z.string({ required_error: 'Fuel Type ID is Required' }),
    uomId: z.string({ required_error: 'UOM ID is Required' }),
    quantity: z.number({ required_error: 'Quantity is Required' }),
    amount: z.number({ required_error: 'Amount is Required' }),
    remarks: z.string().optional(),
  }),
});

const update = z.object({
  body: z.object({
    vehicleId: z.string().optional(),
    date: z.string().optional(),
    fuelTypeId: z.string().optional(),
    uomId: z.string().optional(),
    quantity: z.number().optional(),
    amount: z.number().optional(),
    remarks: z.string().optional(),
  }),
});

export const FuelValidation = {
  create,
  update,
};
