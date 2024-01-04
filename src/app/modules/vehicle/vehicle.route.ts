import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { VehicleValidation } from './vehicle.validation';
import { VehicleController } from './vehicle.controller';

const router = express.Router();

// create Vehicle
router.post(
  '/create',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  validateRequest(VehicleValidation.create),
  VehicleController.createVehicle
);

// get all Vehicle
router.get(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  VehicleController.getVehicles
);

// get single Vehicle
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  VehicleController.getSingleVehicle
);

// update single Vehicle
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  validateRequest(VehicleValidation.update),
  VehicleController.updateVehicle
);

// delete single Vehicle
router.patch(
  '/:id/inactive',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  VehicleController.inactiveVehicle
);

export const VehicleRoutes = router;
