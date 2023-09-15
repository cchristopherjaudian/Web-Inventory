import { useRoutes } from 'react-router-dom';
import LoginRoutes from './LoginRoutes';
import AdminRoutes from './AdminRoutes';
import SubOneRoutes from './SubOneRoutes';
import SubTwoRoutes from './SubTwoRoutes';

export default function ThemeRoutes() {
  return useRoutes([AdminRoutes]);
}
