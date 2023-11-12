import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { FuelValidation } from './fuel.validation';
import { FuelController } from './fuel.controller';

const router = express.Router();

// create Fuel
router.post(
  '/create',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(FuelValidation.create),
  FuelController.createFuel
);

// get all Fuel
router.get(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  FuelController.getParties
);

// get single Fuel
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  FuelController.getSingleFuel
);

// update single Fuel
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(FuelValidation.update),
  FuelController.updateFuel
);

// delete single Fuel
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  FuelController.deleteFuel
);

export const FuelRoutes = router;
