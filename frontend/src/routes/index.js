import { useRoutes } from 'react-router-dom';
import LoginRoutes from './LoginRoutes';
import AdminRoutes from './AdminRoutes';
import SubOneRoutes from './SubOneRoutes';
import SubTwoRoutes from './SubTwoRoutes';
import LogisticRoutes from './LogisticRoutes';
import WHRoutes from './WHRoutes';
import CustomerRoutes from './CustomerRoutes';
import DefaultRoutes from './DefaultRoutes';
import { useSelector } from 'react-redux';

export default function ThemeRoutes() {
  const isadmin = useSelector((state) => state.token.isadmin.isadmin);
  const admintype = useSelector((state) => state.token.admintype.adminType);
  const isauth = useSelector((state) => state.token.authenticated.authenticated);
  let allowedRoutes = [LoginRoutes];
  if (isauth) {
    if (isadmin) {
      switch (admintype) {
        case 0:
          allowedRoutes = [AdminRoutes];
          break;
        case 1:
          allowedRoutes = [SubOneRoutes];
          break;
        case 2:
          allowedRoutes = [SubTwoRoutes];
          break;
        case 3: //WH
          allowedRoutes = [WHRoutes];
          break;
        case 4: //Logistics
          allowedRoutes = [LogisticRoutes];
          break;
      }
    } else {
      allowedRoutes = [CustomerRoutes];
    }
  }

  return useRoutes([...allowedRoutes, DefaultRoutes]);
}
