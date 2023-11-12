import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { UomValidation } from './uom.validation';
import { UomController } from './uom.controller';

const router = express.Router();

// create Uom
router.post(
  '/create',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(UomValidation.createUpdate),
  UomController.createUom
);

// get all Uom
router.get(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  UomController.getAllUom
);

// update single Uom
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(UomValidation.createUpdate),
  UomController.updateUom
);

export const UomRoutes = router;
