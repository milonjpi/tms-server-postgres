import { z } from 'zod';

const create = z.object({
  body: z.object({
    label: z.string({ required_error: 'Label is Required' }),
    uomId: z.string({ required_error: 'UOM is Required' }),
  }),
});

const update = z.object({
  body: z.object({
    label: z.string().optional(),
    uomId: z.string().optional(),
  }),
});

export const EquipmentTitleValidation = {
  create,
  update,
};
