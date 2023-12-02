import { z } from 'zod';

const create = z.object({
  body: z.object({
    date: z.string({ required_error: 'Date is Required' }),
    vehicleId: z.string({ required_error: 'Vehicle ID is Required' }),
    driverId: z.string({ required_error: 'Driver ID is required' }),
    details: z.string({ required_error: 'Accident Details is required' }),
    location: z.string({ required_error: 'Location Details is required' }),
    amountStatus: z.enum(['Paid', 'Received', 'Nothing'], {
      required_error: 'Paid Status is Required',
    }),
    totalAmount: z.number({ required_error: 'Amount is Required' }),
    odoMeter: z.number({ required_error: 'Odo Meter is Required' }),
  }),
});

const update = z.object({
  body: z.object({
    date: z.string().optional(),
    vehicleId: z.string().optional(),
    driverId: z.string().optional(),
    details: z.string().optional(),
    location: z.string().optional(),
    amountStatus: z.enum(['Paid', 'Received', 'Nothing']).optional(),
    totalAmount: z.number().optional(),
    odoMeter: z.number().optional(),
  }),
});

export const AccidentHistoryValidation = {
  create,
  update,
};
