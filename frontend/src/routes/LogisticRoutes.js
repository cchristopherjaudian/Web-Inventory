import { lazy } from 'react';

import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';


const Dispatched = Loadable(lazy(()=> import('pages/logistics/')));
const OrderInfo = Loadable(lazy(()=> import('pages/logistics/orderInfo/')));
const Profile = Loadable(lazy(()=> import('pages/common/profile')));
const LogisticRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Dispatched />
      },
      {
        path: 'order/:id',
        element: <OrderInfo />
      },
      {
        path: 'profile',
        element: <Profile />
      }
    ]
  };
  
  export default LogisticRoutes;