import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { Box, Toolbar, useMediaQuery } from '@mui/material';
import Drawer from './Drawer';
import Header from './Header';
import adminnavigation from 'menu-items/admin';
import sub1navigation from 'menu-items/subadmin1';
import sub2navigation from 'menu-items/subadmin2';
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import { openDrawer } from 'store/reducers/menu';
import { useLocation } from 'react-router-dom';
import Footer from './Footer/index';

const MainLayout = () => {
  const theme = useTheme();
  const location = useLocation();
  const matchUpMD = useMediaQuery(theme.breakpoints.up('lg'));
  const matchDownLG = useMediaQuery(theme.breakpoints.down('lg'));
  const dispatch = useDispatch();
  const admintype = useSelector((state) => state.token.admintype.adminType);
  const { drawerOpen } = useSelector((state) => state.menu);
  const [open, setOpen] = useState(drawerOpen);
  let navigation = [adminnavigation, sub1navigation, sub2navigation][admintype];
  const handleDrawerToggle = () => {
    setOpen(!open);
    dispatch(openDrawer({ drawerOpen: !open }));
  };

  useEffect(() => {
    setOpen(!matchDownLG);
    dispatch(openDrawer({ drawerOpen: !matchDownLG }));
  }, [matchDownLG]);

  useEffect(() => {
    if (open !== drawerOpen) setOpen(drawerOpen);
  }, [drawerOpen]);
  console.log(location.pathname);
  return (
    <>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <Header open={open} handleDrawerToggle={handleDrawerToggle} />
        <Drawer open={open} handleDrawerToggle={handleDrawerToggle} />
        <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
          <Toolbar />
          <Breadcrumbs navigation={navigation} title />
          <Outlet />
        </Box>

      </Box>
      {
        (matchUpMD && !location.pathname.startsWith('/home')) && <Footer />
        //(matchUpMD) && <Footer />
      }
     
    </>
  );
};

export default MainLayout;
