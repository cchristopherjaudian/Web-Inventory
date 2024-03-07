import { lazy } from 'react';

import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

const Orders = Loadable(lazy(() => import('pages/wh/')));
const Inventory = Loadable(lazy(() => import('pages/wh/inventory/')));
const OrderInfo = Loadable(lazy(() => import('pages/wh/orderInfo')));
const Profile = Loadable(lazy(() => import('pages/common/profile')));
const WHRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <Orders />
    },
    {
      path: '/order/:id',
      element: <OrderInfo />
    },
    {
      path: 'profile',
      element: <Profile />
    },
    {
      path: 'inventory',
      element: <Inventory />
    }
  ]
};

export default WHRoutes;
