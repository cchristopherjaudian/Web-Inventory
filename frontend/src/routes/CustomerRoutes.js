import { lazy } from 'react';

import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';


const Home = Loadable(lazy(() => import('pages/customer/home/')));
const About = Loadable(lazy(() => import('pages/customer/about/')));
const Shop = Loadable(lazy(() => import('pages/customer/shop/')));
const Schedule = Loadable(lazy(() => import('pages/admin/routesched/')));
const Product = Loadable(lazy(()=> import('pages/customer/product/')));
const Checkout = Loadable(lazy(()=>import('pages/customer/checkout/')));
const Invoice = Loadable(lazy(()=>import('pages/customer/invoice/')));
const Profile = Loadable(lazy(()=> import('pages/common/profile/')));
const History = Loadable(lazy(()=> import('pages/customer/history/')));
const Purchase = Loadable(lazy(()=> import('pages/customer/purchase/')));
const Quotation = Loadable(lazy(()=> import('pages/customer/purchase/quotation/')));
const Order = Loadable(lazy(()=> import('pages/customer/purchase/order/')));
const POHistory = Loadable(lazy(()=> import('pages/customer/purchase/history/')));
const OrderPreview = Loadable(lazy(()=> import('pages/customer/order/')));
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
        path: 'shop',
        element: <Shop />
      },
      {
        path: 'schedule',
        element: <Schedule/>
      },
      {
        path: 'product/:id',
        element: <Product/>
      },
      {
        path: 'checkout',
        element:<Checkout/>
      },
      {
        path: 'invoice/:id',
        element:<Invoice/>
      },
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path: 'history',
        element: <History />
      },
      {
        path: 'purchase/request',
        element: <Purchase />
      },
      {
        path: 'purchase/quotation/:id',
        element: <Quotation />
      },
      {
        path: 'purchase/order/:id',
        element: <Order />
      },
      {
        path: 'purchase/history',
        element: <POHistory />
      },
      {
        path: 'order/:id',
        element: <OrderPreview />
      }
    ]
  };
  
  export default CustomerRoutes;