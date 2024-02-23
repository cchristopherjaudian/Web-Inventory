import { Box, Typography } from '@mui/material';
import NavGroup from './NavGroup';
import { useSelector } from 'react-redux';
import adminnavigation from 'menu-items/admin';
import sub1navigation from 'menu-items/subadmin1';
import sub2navigation from 'menu-items/subadmin2';
import whnavigation from 'menu-items/wh';
import logiNavItems from 'menu-items/logi';
const Navigation = () => {
  const admintype = useSelector((state) => state.token.admintype.adminType);
  let menuItem = [adminnavigation, sub1navigation, sub2navigation, whnavigation, logiNavItems][admintype];
  const navGroups = menuItem.items.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Navigation Group
          </Typography>
        );
    }
  });

  return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
};

export default Navigation;
