import { lazy } from 'react';

import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';


const Inventory = Loadable(lazy(()=> import('pages/subadmin2/inventory/')))
const Settings = Loadable(lazy(() => import('pages/admin/Settings')));
const UpdateForm = Loadable(lazy(()=>import('pages/subadmin2/inventory/UpdateForm')));
const Profile = Loadable(lazy(()=> import('pages/common/profile')));
const SubTwoRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Inventory />
      },
      {
        path: 'settings',
        element: <Settings />
      },
      {
        path: 'inventories/:id',
        element: <UpdateForm />
      },
      {
        path: 'profile',
        element: <Profile />
      }
    ]
  };
  
  export default SubTwoRoutes;