import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { IncomeHeadValidation } from './incomeHead.validation';
import { IncomeHeadController } from './incomeHead.controller';

const router = express.Router();

// create income head
router.post(
  '/create',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  validateRequest(IncomeHeadValidation.create),
  IncomeHeadController.createIncomeHead
);

// get income heads
router.get(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  IncomeHeadController.getIncomeHeads
);

// update income head
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  validateRequest(IncomeHeadValidation.update),
  IncomeHeadController.updateIncomeHead
);

export const IncomeHeadRoutes = router;
