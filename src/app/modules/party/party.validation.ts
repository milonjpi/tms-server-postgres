import { z } from 'zod';

const create = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is Required' }),
    mobile: z.string({ required_error: 'Mobile is Required' }),
    address: z.string({ required_error: 'Address is Required' }),
  }),
});

const update = z.object({
  body: z.object({
    name: z.string().optional(),
    mobile: z.string().optional(),
    address: z.string().optional(),
  }),
});

export const PartyValidation = {
  create,
  update,
};
