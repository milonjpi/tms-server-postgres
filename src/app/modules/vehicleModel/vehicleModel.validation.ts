import { z } from 'zod';

const createUpdate = z.object({
  body: z.object({
    label: z.string({ required_error: 'Model is Required' }),
  }),
});

export const ModelValidation = {
  createUpdate,
};
