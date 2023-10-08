import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { UserRoutes } from '../modules/user/user.route';
import { MenuPermissionRoutes } from '../modules/menuPermission/menuPermission.route';
import { SubMenuPermissionRoutes } from '../modules/subMenuPermission/subMenuPermission.route';
import { SectionPermissionRoutes } from '../modules/sectionPermission/sectionPermission.route';

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
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
