import { z } from 'zod';

const create = z.object({
  body: z.object({
    data: z.object(
      {
        startDate: z.string({ required_error: 'Start Date is Required' }),
        endDate: z.string({ required_error: 'End Date is Required' }),
        from: z.string({ required_error: 'From Location is Required' }),
        to: z.string({ required_error: 'To Location is Required' }),
        distance: z.number({ required_error: 'Distance is Required' }),
        tripValue: z.number({ required_error: 'Trip value is Required' }),
        vehicleId: z.string({ required_error: 'Vehicle ID is Required' }),
        driverId: z.string({ required_error: 'Driver ID is Required' }),
        partyId: z.string({ required_error: 'Party ID is Required' }),
      },
      { required_error: 'Trip Data is required' }
    ),
    incomes: z.array(
      z.object({
        date: z.string({ required_error: 'Date is required' }),
        incomeHeadId: z.string({ required_error: 'Income Head is required' }),
        amount: z.number({ required_error: 'Amount is required' }),
        remarks: z.string().optional(),
      }),
      { required_error: 'Incomes is required' }
    ),
    expenses: z.array(
      z.object({
        date: z.string({ required_error: 'Date is required' }),
        expenseHeadId: z.string({ required_error: 'Expense head is required' }),
        amount: z.number({ required_error: 'Amount is required' }),
        remarks: z.string().optional(),
      }),
      { required_error: 'Expenses is required' }
    ),
  }),
});

const update = z.object({
  body: z.object({
    data: z
      .object({
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        from: z.string().optional(),
        to: z.string().optional(),
        distance: z.number().optional(),
        tripValue: z.number().optional(),
        vehicleId: z.string().optional(),
        driverId: z.string().optional(),
        partyId: z.string().optional(),
      })
      .optional(),
    incomes: z
      .array(
        z.object({
          date: z.string().optional(),
          incomeHeadId: z.string().optional(),
          amount: z.number().optional(),
          remarks: z.string().optional(),
        })
      )
      .optional(),
    expenses: z
      .array(
        z.object({
          date: z.string().optional(),
          incomeHeadId: z.string().optional(),
          amount: z.number().optional(),
          remarks: z.string().optional(),
        })
      )
      .optional(),
  }),
});

export const TripValidation = {
  create,
  update,
};
