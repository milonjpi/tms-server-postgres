import { z } from 'zod';

const createUpdate = z.object({
  body: z.object({
    label: z.string({ required_error: 'UOM is Required' }),
  }),
});

export const UomValidation = {
  createUpdate,
};
