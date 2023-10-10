import { lazy } from 'react';

import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import { element } from 'prop-types';


const TransactionRecords = Loadable(lazy(() => import('pages/subadmin1/transaction/')));
const OrderNotice = Loadable(lazy(() => import('pages/subadmin1/ordernotice/')));
const Orders = Loadable(lazy(() => import('pages/subadmin1/orders/')));
const OrderInfo = Loadable(lazy(() => import('pages/subadmin1/ordernotice/orderinfo')));

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
    },
    {
      path: 'order/:id',
      element: <OrderInfo />
    }
  ]
};

export default SubOneRoutes;