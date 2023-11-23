import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { AccountHeadValidation } from './accountHead.validation';
import { AccountHeadController } from './accountHead.controller';

const router = express.Router();

// create account head
router.post(
  '/create',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  validateRequest(AccountHeadValidation.create),
  AccountHeadController.createAccountHead
);

// get account heads
router.get(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  AccountHeadController.getAccountHeads
);

// update account head
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  validateRequest(AccountHeadValidation.update),
  AccountHeadController.updateAccountHead
);

export const AccountHeadRoutes = router;
