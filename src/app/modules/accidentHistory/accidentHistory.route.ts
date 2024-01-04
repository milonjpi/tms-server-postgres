import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { AccidentHistoryValidation } from './accidentHistory.validation';
import { AccidentHistoryController } from './accidentHistory.controller';

const router = express.Router();

// create accident history
router.post(
  '/create',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  validateRequest(AccidentHistoryValidation.create),
  AccidentHistoryController.createAccidentHistory
);

// get all accident history
router.get(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  AccidentHistoryController.getAccidentHistories
);

// update accident history
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  validateRequest(AccidentHistoryValidation.update),
  AccidentHistoryController.updateAccidentHistory
);

// delete accident history
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  AccidentHistoryController.deleteAccidentHistory
);

export const AccidentHistoryRoutes = router;
