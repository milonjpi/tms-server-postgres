import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { ReportController } from './report.controller';

const router = express.Router();

// get summary
router.get(
  '/summary',
  //   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ReportController.getSummaries
);

// fuel status
router.get(
  '/fuel-status',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ReportController.getFuelStatus
);

// stock status
router.get(
  '/stock-status',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ReportController.getStockStatus
);

export const ReportRoutes = router;
