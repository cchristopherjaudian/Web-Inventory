import { Box, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';

import Search from './Search';
import Profile from './Profile';
import Notification from './Notification';
import MobileSection from './MobileSection';
import Navbar from './Navbar';
const HeaderContent = () => {
  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const isadmin = useSelector((state) => state.token.isadmin.isadmin);
  return (
    <>
      {isadmin ? (
        <>
          {!matchesXs && <Search />}
          {matchesXs && <Box sx={{ width: '100%', ml: 1 }} />}
          {!matchesXs && <Profile />}
          {matchesXs && <MobileSection />}
        </>
      ) : (
        <Navbar />
      )}
    </>
  );
};

export default HeaderContent;
