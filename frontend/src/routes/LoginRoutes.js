import { lazy } from 'react';
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('pages/authentication/Register')));
const Otp = Loadable(lazy(() => import('pages/authentication/Otp')));
const Forgot = Loadable(lazy(() => import('pages/authentication/Forgot')));
const LoginRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '',
      element: <AuthLogin />
    },
    {
      path: 'register',
      element: <AuthRegister />
    },
    {
      path: 'verification',
      element: <Otp />
    },
    {
      path: 'forgot',
      element: <Forgot />
    }
  ]
};

export default LoginRoutes;
