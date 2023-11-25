import { z } from 'zod';

const create = z.object({
  body: z.object({
    regNo: z.string({ required_error: 'Reg No is Required' }),
    brand: z.string({ required_error: 'Brand No is Required' }),
    model: z.string().optional(),
    vehicleValue: z.number().optional(),
    driverId: z.string().optional(),
    isActive: z.boolean().optional(),
  }),
});

const update = z.object({
  body: z.object({
    regNo: z.string().optional(),
    brand: z.string().optional(),
    model: z.string().optional(),
    vehicleValue: z.number().optional(),
    driverId: z.string().optional(),
    isActive: z.boolean().optional(),
  }),
});

export const VehicleValidation = {
  create,
  update,
};
