import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { FuelTypeValidation } from './fuelType.validation';
import { FuelTypeController } from './fuelType.controller';

const router = express.Router();

// create FuelType
router.post(
  '/create',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  validateRequest(FuelTypeValidation.createUpdate),
  FuelTypeController.createFuelType
);

// get all FuelType
router.get(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  FuelTypeController.getAllFuelType
);

// update single FuelType
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  validateRequest(FuelTypeValidation.createUpdate),
  FuelTypeController.updateFuelType
);

export const FuelTypeRoutes = router;
