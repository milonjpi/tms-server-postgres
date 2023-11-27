import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { FuelPumpValidation } from './fuelPump.validation';
import { FuelPumpController } from './fuelPump.controller';

const router = express.Router();

// create Fuel Pump
router.post(
  '/create',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(FuelPumpValidation.create),
  FuelPumpController.createFuelPump
);

// get all Fuel Pump
router.get(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  FuelPumpController.getFuelPumps
);

// get single Fuel Pump
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  FuelPumpController.getSingleFuelPump
);

// update single Fuel Pump
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(FuelPumpValidation.update),
  FuelPumpController.updateFuelPump
);

export const FuelPumpRoutes = router;
