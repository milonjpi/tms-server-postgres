import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { MaintenanceValidation } from './maintenance.validation';
import { MaintenanceController } from './maintenance.controller';

const router = express.Router();

// create Maintenance
router.post(
  '/create',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(MaintenanceValidation.create),
  MaintenanceController.createMaintenance
);

// get all Maintenance
router.get(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  MaintenanceController.getMaintenances
);

// get single Maintenance
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  MaintenanceController.getSingleMaintenance
);

// update single Maintenance
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(MaintenanceValidation.update),
  MaintenanceController.updateMaintenance
);

// delete single Maintenance
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  MaintenanceController.deleteMaintenance
);

export const MaintenanceRoutes = router;
