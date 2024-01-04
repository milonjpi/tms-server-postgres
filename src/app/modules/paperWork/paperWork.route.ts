import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { PaperWorkValidation } from './paperWork.validation';
import { PaperWorkController } from './paperWork.controller';

const router = express.Router();

// create Paper Work
router.post(
  '/create',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  validateRequest(PaperWorkValidation.create),
  PaperWorkController.createPaperWork
);

// get all Paper Work
router.get(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  PaperWorkController.getPaperWorks
);

// update single Paper Work
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  validateRequest(PaperWorkValidation.update),
  PaperWorkController.updatePaperWork
);

// delete single Paper Work
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  PaperWorkController.deletePaperWork
);

export const PaperWorkRoutes = router;
