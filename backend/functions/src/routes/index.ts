import { Router } from 'express';
import accountRoutes from './account-routes';
import profileRoutes from './profile-routes';
import productRoutes from './product-routes';
import inventoryRoutes from './inventory-routes';
import cartRoutes from './cart-routes';
import orderRoutes from './order-routes';
import scheduleRoutes from './schedule-routes';

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
    {
        path: '/products',
        controller: productRoutes,
    },
    {
        path: '/inventories',
        controller: inventoryRoutes,
    },
    {
        path: '/carts',
        controller: cartRoutes,
    },
    {
        path: '/orders',
        controller: orderRoutes,
    },
    {
        path: '/schedules',
        controller: scheduleRoutes,
    },
];

defaultRoutes.forEach((route) => router.use(route.path, route.controller));

export default router;
