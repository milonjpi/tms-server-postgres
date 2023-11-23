import { z } from 'zod';

const create = z.object({
  body: z.object({
    equipmentTitleId: z.string({
      required_error: 'Equipment Title is Required',
    }),
    quantity: z.number({ required_error: 'Quantity is Required' }),
    unitPrice: z.number({ required_error: 'Unit Price is Required' }),
    totalPrice: z.number({ required_error: 'Total Price is Required' }),
    remarks: z.string().optional(),
  }),
});

const update = z.object({
  body: z.object({
    equipmentTitleId: z.string().optional(),
    quantity: z.number().optional(),
    unitPrice: z.number().optional(),
    totalPrice: z.number().optional(),
    remarks: z.string().optional(),
  }),
});

export const EquipmentValidation = {
  create,
  update,
};
