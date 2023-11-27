import { z } from 'zod';

const create = z.object({
  body: z.object({
    label: z.string({ required_error: 'Fuel Pump Name is Required' }),
    address: z.string().optional(),
  }),
});
const update = z.object({
  body: z.object({
    label: z.string().optional(),
    address: z.string().optional(),
  }),
});

export const FuelPumpValidation = {
  create,
  update,
};
