import { z } from 'zod';

const create = z.object({
  body: z.object({
    label: z.string({ required_error: 'Label is Required' }),
    accountHeadId: z.string({ required_error: 'Account Head ID is required' }),
  }),
});

const update = z.object({
  body: z.object({
    label: z.string().optional(),
    accountHeadId: z.string().optional(),
  }),
});

export const IncomeHeadValidation = {
  create,
  update,
};
