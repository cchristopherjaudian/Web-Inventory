import { lazy } from 'react';
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

const Legal = Loadable(lazy(() => import('pages/general/legal/legal.js')));
const DefaultRoutes = {
  path: '/legal',
  element: <MinimalLayout />,
  children: [
    {
      path: '',
      element: <Legal />
    }
  ]
};

export default DefaultRoutes;
