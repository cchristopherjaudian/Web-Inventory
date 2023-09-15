import { lazy } from 'react';

import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';


const TransactionRecords = Loadable(lazy(() => import('pages/subadmin1/transaction/')));
const OrderNotice = Loadable(lazy(() => import('pages/subadmin1/ordernotice/')));
const Orders = Loadable(lazy(() => import('pages/subadmin1/orders/')));


const SubOneRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <TransactionRecords />
      },
      {
        path: 'transactions',
        element: <TransactionRecords />
      },
      {
        path: 'notice',
        element: <OrderNotice />
      },
      {
        path: 'orders',
        element: <Orders />
      }
    ]
  };
  
  export default SubOneRoutes;