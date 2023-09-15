import { lazy } from 'react';

import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';


const Inventory = Loadable(lazy(()=> import('pages/subadmin2/inventory')))
const Settings = Loadable(lazy(() => import('pages/admin/Settings')));


const SubTwoRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Inventory />
      },
      {
        path: 'inventory',
        element: <Inventory />
      },
      {
        path: 'settings',
        element: <Settings />
      }
    ]
  };
  
  export default SubTwoRoutes;