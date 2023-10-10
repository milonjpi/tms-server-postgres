import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { DriverValidation } from './driver.validation';
import { DriverController } from './driver.controller';

const router = express.Router();

// create Driver
router.post(
  '/create',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(DriverValidation.create),
  DriverController.createDriver
);

// get all Driver
router.get(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  DriverController.getDrivers
);

// get single Driver
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  DriverController.getSingleDriver
);

// update single Driver
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(DriverValidation.update),
  DriverController.updateDriver
);

// inactive single Driver
router.patch(
  '/:id/inactive',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  DriverController.inactiveDriver
);

export const DriverRoutes = router;
