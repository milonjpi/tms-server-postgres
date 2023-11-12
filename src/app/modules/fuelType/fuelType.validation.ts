import { z } from 'zod';

const createUpdate = z.object({
  body: z.object({
    label: z.string({ required_error: 'Fuel Type is Required' }),
  }),
});

export const FuelTypeValidation = {
  createUpdate,
};
