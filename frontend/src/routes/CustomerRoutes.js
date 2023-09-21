import { lazy } from 'react';

import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';


const Home = Loadable(lazy(() => import('pages/customer/home/')));
const About = Loadable(lazy(() => import('pages/customer/about/')));
const Career = Loadable(lazy(() => import('pages/customer/career/')));
const Shop = Loadable(lazy(() => import('pages/customer/shop/')));
const Schedule = Loadable(lazy(() => import('pages/customer/schedule/')));

const CustomerRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: 'home',
        element: <Home />
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'career',
        element: <Career />
      },
      {
        path: 'shop',
        element: <Shop />
      },
      {
        path: 'schedule',
        element: <Schedule/>
      }
    ]
  };
  
  export default CustomerRoutes;