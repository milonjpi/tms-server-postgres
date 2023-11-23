import { z } from 'zod';

const create = z.object({
  body: z.object({
    data: z.object(
      {
        date: z.string({ required_error: 'Date is Required' }),
        vehicleId: z.string({ required_error: 'Vehicle ID is Required' }),
        driverId: z.string({ required_error: 'Driver ID is Required' }),
        fuelTypeId: z.string({ required_error: 'Fuel Type ID is Required' }),
        odoMeter: z.string().optional(),
        quantity: z.number({ required_error: 'Quantity is Required' }),
        amount: z.number({ required_error: 'Amount is Required' }),
        remarks: z.string().optional(),
      },
      { required_error: 'Data is Required' }
    ),
    expenses: z.array(
      z.object({
        date: z.string({ required_error: 'Date is required' }),
        expenseHeadId: z.string({ required_error: 'Expense Head is required' }),
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
        date: z.string().optional(),
        vehicleId: z.string().optional(),
        driverId: z.string().optional(),
        fuelTypeId: z.string().optional(),
        odoMeter: z.string().optional(),
        quantity: z.number().optional(),
        amount: z.number().optional(),
        remarks: z.string().optional(),
      })
      .optional(),
    expenses: z
      .array(
        z.object({
          date: z.string().optional(),
          expenseHeadId: z.string().optional(),
          amount: z.number().optional(),
          remarks: z.string().optional(),
        })
      )
      .optional(),
  }),
});

export const FuelValidation = {
  create,
  update,
};
