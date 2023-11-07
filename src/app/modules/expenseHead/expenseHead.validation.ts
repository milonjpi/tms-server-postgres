import { z } from 'zod';

const create = z.object({
  body: z.object({
    label: z.string({ required_error: 'Label is Required' }),
    type: z.enum(['general', 'trip'], { required_error: 'Type is Required' }),
  }),
});

const update = z.object({
  body: z.object({
    label: z.string().optional(),
    type: z.enum(['general', 'trip']).optional(),
  }),
});

export const ExpenseHeadValidation = {
  create,
  update,
};
