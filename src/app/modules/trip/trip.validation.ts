import { z } from 'zod';

const create = z.object({
  body: z.object({
    startDate: z.string({ required_error: 'Start Date is Required' }),
    endDate: z.string({ required_error: 'End Date is Required' }),
    from: z.string({ required_error: 'From Location is Required' }),
    to: z.string({ required_error: 'To Location is Required' }),
    distance: z.number({ required_error: 'Distance is Required' }),
    tripValue: z.number({ required_error: 'Trip value is Required' }),
    vehicleId: z.string({ required_error: 'Vehicle ID is Required' }),
    driverId: z.string({ required_error: 'Driver ID is Required' }),
  }),
});

const update = z.object({
  body: z.object({
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    from: z.string().optional(),
    to: z.string().optional(),
    distance: z.number().optional(),
    tripValue: z.number().optional(),
    vehicleId: z.string().optional(),
    driverId: z.string().optional(),
  }),
});

export const TripValidation = {
  create,
  update,
};
