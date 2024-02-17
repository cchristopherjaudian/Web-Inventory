import { lazy } from 'react';

import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

const OrderNotice = Loadable(lazy(() => import('pages/subadmin1/ordernotice/')));
const Profile = Loadable(lazy(()=> import('pages/common/profile')));
const WHRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <OrderNotice />
    },
    {
      path: 'profile',
      element: <Profile />
    }
  ]
};

export default WHRoutes;