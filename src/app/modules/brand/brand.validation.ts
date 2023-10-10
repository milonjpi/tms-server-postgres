import { z } from 'zod';

const createUpdate = z.object({
  body: z.object({
    label: z.string({ required_error: 'Brand is Required' }),
  }),
});

export const BrandValidation = {
  createUpdate,
};
