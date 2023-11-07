import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { TripExpenseValidation } from './tripExpense.validation';
import { TripExpenseController } from './tripExpense.controller';

const router = express.Router();

// create Trip
router.post(
  '/create',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  validateRequest(TripExpenseValidation.create),
  TripExpenseController.createExpense
);

// get Trip expenses
router.get(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  TripExpenseController.getTripExpenses
);

// update Trip expenses
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  validateRequest(TripExpenseValidation.update),
  TripExpenseController.updateTripExpense
);

// delete single Trip
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  TripExpenseController.deleteTripExpense
);

export const TripExpenseRoutes = router;
