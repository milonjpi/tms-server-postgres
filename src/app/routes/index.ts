import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { UserRoutes } from '../modules/user/user.route';
import { MenuPermissionRoutes } from '../modules/menuPermission/menuPermission.route';
import { SubMenuPermissionRoutes } from '../modules/subMenuPermission/subMenuPermission.route';
import { SectionPermissionRoutes } from '../modules/sectionPermission/sectionPermission.route';
import { BrandRoutes } from '../modules/brand/brand.route';
import { ModelRoutes } from '../modules/vehicleModel/vehicleModel.route';
import { VehicleRoutes } from '../modules/vehicle/vehicle.route';
import { DriverRoutes } from '../modules/driver/driver.route';
import { PartyRoutes } from '../modules/party/party.route';
import { TripRoutes } from '../modules/trip/trip.route';
import { ProfileRoutes } from '../modules/profile/profile.route';
import { ExpenseHeadRoutes } from '../modules/expenseHead/expenseHead.route';
import { TripExpenseRoutes } from '../modules/tripExpense/tripExpense.route';
import { UomRoutes } from '../modules/uom/uom.route';
import { FuelTypeRoutes } from '../modules/fuelType/fuelType.route';
import { FuelRoutes } from '../modules/fuel/fuel.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/profile',
    route: ProfileRoutes,
  },
  {
    path: '/menu-permission',
    route: MenuPermissionRoutes,
  },
  {
    path: '/subMenu-permission',
    route: SubMenuPermissionRoutes,
  },
  {
    path: '/section-permission',
    route: SectionPermissionRoutes,
  },
  {
    path: '/brand',
    route: BrandRoutes,
  },
  {
    path: '/model',
    route: ModelRoutes,
  },
  {
    path: '/vehicle',
    route: VehicleRoutes,
  },
  {
    path: '/driver',
    route: DriverRoutes,
  },
  {
    path: '/party',
    route: PartyRoutes,
  },
  {
    path: '/expense-head',
    route: ExpenseHeadRoutes,
  },
  {
    path: '/trip',
    route: TripRoutes,
  },
  {
    path: '/trip-expense',
    route: TripExpenseRoutes,
  },
  {
    path: '/uom',
    route: UomRoutes,
  },
  {
    path: '/fuel-type',
    route: FuelTypeRoutes,
  },
  {
    path: '/fuel',
    route: FuelRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
