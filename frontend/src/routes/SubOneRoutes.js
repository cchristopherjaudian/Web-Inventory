import { lazy } from 'react';

import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import { element } from 'prop-types';


const TransactionRecords = Loadable(lazy(() => import('pages/subadmin1/transaction/')));
const OrderNotice = Loadable(lazy(() => import('pages/subadmin1/ordernotice/')));
const Orders = Loadable(lazy(() => import('pages/subadmin1/orders/')));
const OrderInfo = Loadable(lazy(() => import('pages/subadmin1/ordernotice/orderinfo')));
const PurchaseRequest = Loadable(lazy(() => import('pages/subadmin1/purchaserequest/')));
const PRInfo = Loadable(lazy(() => import('pages/subadmin1/purchaserequest/info/prinfo')));
const Profile = Loadable(lazy(()=> import('pages/common/profile')));
const Quotation = Loadable(lazy(()=> import('pages/subadmin1/quotation/')));
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
    },
    {
      path: 'pr',
      element: <PurchaseRequest />
    },
    {
      path: 'pr/:id',
      element: <PRInfo />
    },
    {
      path: 'quotation/:id',
      element: <Quotation/>
    },
    {
      path: 'profile',
      element: <Profile />
    }
  ]
};

export default SubOneRoutes;