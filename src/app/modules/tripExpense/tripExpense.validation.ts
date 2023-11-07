import { z } from 'zod';

const create = z.object({
  body: z.object({
    id: z.string({ required_error: 'Trip ID is Required' }),
    data: z.array(
      z.object({
        expenseHeadId: z.string({ required_error: 'Expense head is Required' }),
        amount: z.number({ required_error: 'Amount is Required' }),
      })
    ),
  }),
});

const update = z.object({
  body: z.object({
    data: z.array(
      z.object({
        expenseHeadId: z.string({ required_error: 'Expense head is Required' }),
        amount: z.number({ required_error: 'Amount is Required' }),
      })
    ),
  }),
});

export const TripExpenseValidation = {
  create,
  update,
};
