import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { EquipmentTitleValidation } from './equipmentTitle.validation';
import { EquipmentTitleController } from './equipmentTitle.controller';

const router = express.Router();

// create equipment title
router.post(
  '/create',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  validateRequest(EquipmentTitleValidation.create),
  EquipmentTitleController.createEquipmentTitle
);

// get equipment titles
router.get(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  EquipmentTitleController.getEquipmentTitles
);

// update equipment title
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  validateRequest(EquipmentTitleValidation.update),
  EquipmentTitleController.updateEquipmentTitle
);

export const EquipmentTitleRoutes = router;
