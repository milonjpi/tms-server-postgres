import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { ExpenseHeadValidation } from './expenseHead.validation';
import { ExpenseHeadController } from './expenseHead.controller';

const router = express.Router();

// create expense head
router.post(
  '/create',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  validateRequest(ExpenseHeadValidation.create),
  ExpenseHeadController.createExpenseHead
);

// get expense heads
router.get(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  ExpenseHeadController.getExpenseHeads
);

// update expense head
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  validateRequest(ExpenseHeadValidation.update),
  ExpenseHeadController.updateExpenseHead
);

// delete expense head
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ExpenseHeadController.deleteExpenseHead
);

export const ExpenseHeadRoutes = router;
