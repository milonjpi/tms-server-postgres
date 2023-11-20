import { z } from 'zod';

const create = z.object({
  body: z.object({
    date: z.string({ required_error: 'Date is Required' }),
    vehicleId: z.string({ required_error: 'Vehicle ID is Required' }),
    expenseHeadId: z.string({ required_error: 'Expense Head ID is Required' }),
    description: z.string({ required_error: 'Description is Required' }),
    amount: z.number({ required_error: 'Amount is Required' }),
  }),
});

const update = z.object({
  body: z.object({
    date: z.string().optional(),
    vehicleId: z.string().optional(),
    expenseHeadId: z.string().optional(),
    description: z.string().optional(),
    amount: z.number().optional(),
  }),
});

export const ExpenseValidation = {
  create,
  update,
};
