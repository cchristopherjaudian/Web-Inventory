import { lazy } from 'react';

import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import AccountTable from 'pages/admin/account/AccountTable';

const Dashboard = Loadable(lazy(() => import('pages/admin/dashboard/')));
const Oxichat = Loadable(lazy(() => import('pages/admin/oxichat/')));
const TransactionRecords = Loadable(lazy(() => import('pages/admin/transaction/')));
const Inventory = Loadable(lazy(() => import('pages/admin/inventory/')));
const Customers = Loadable(lazy(() => import('pages/admin/customer/')));
const RouteSched = Loadable(lazy(() => import('pages/admin/routesched/')));
const SalesReport = Loadable(lazy(() => import('pages/admin/salesreport/')));
const Account = Loadable(lazy(() => import('pages/admin/account')));
const Maintenance = Loadable(lazy(() => import('pages/admin/Maintenance')));
const Settings = Loadable(lazy(() => import('pages/admin/Settings')));
const OrderNotice = Loadable(lazy(() => import('pages/subadmin1/ordernotice/index')));
const Orders = Loadable(lazy(() => import('pages/subadmin1/orders/index')));
const Profile = Loadable(lazy(() => import('pages/common/profile')));
const AccountRegister = Loadable(lazy(()=>import('pages/admin/account/register')));
const AdminRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <Dashboard />
    },
    {
      path: 'oxichat',
      element: <Oxichat />
    },
    {
      path: 'transactions',
      element: <TransactionRecords />
    },
    {
      path: 'inventory',
      element: <Inventory />
    },
    {
      path: 'b2c',
      element: <Customers type="B2C" />
    },
    {
      path: 'b2b',
      element: <Customers type="B2B" />
    },
    {
      path: 'routes',
      element: <RouteSched />
    },
    {
      path: 'sales',
      element: <SalesReport />
    },
    {
      path: 'account',
      element: <Account />
    },
    {
      path: 'account/register',
      element: <AccountRegister />
    },
    {
      path: 'maintenance',
      element: <Maintenance />
    },
    {
      path: 'settings',
      element: <Settings />
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
      path: 'profile',
      element: <Profile />
    }
  ]
};

export default AdminRoutes;
