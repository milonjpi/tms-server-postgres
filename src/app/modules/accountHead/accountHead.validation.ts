import { z } from 'zod';

const create = z.object({
  body: z.object({
    label: z.string({ required_error: 'Label is Required' }),
    isIncome: z.boolean().optional().default(false),
  }),
});

const update = z.object({
  body: z.object({
    label: z.string().optional(),
    isIncome: z.boolean().optional(),
  }),
});

export const AccountHeadValidation = {
  create,
  update,
};
