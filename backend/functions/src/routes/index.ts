import { Router } from 'express';
import accountRoutes from './account-routes';
import profileRoutes from './profile-routes';

const router = Router();

type TRoute = {
  path: string;
  controller: Router;
};
type TRoutelist = TRoute[];

const defaultRoutes: TRoutelist = [
  {
    path: '/accounts',
    controller: accountRoutes,
  },
  {
    path: '/profiles',
    controller: profileRoutes,
  },
];

defaultRoutes.forEach((route) => router.use(route.path, route.controller));

export default router;
