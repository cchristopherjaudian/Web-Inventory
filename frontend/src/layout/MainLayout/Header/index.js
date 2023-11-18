import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { AppBar, IconButton, Toolbar, useMediaQuery } from '@mui/material';
import AppBarStyled from './AppBarStyled';
import HeaderContent from './HeaderContent';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import {setUserOnlineStatus} from 'config/chat/index';
import { useEffect } from 'react';
const Header = ({ open, handleDrawerToggle }) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

  const iconBackColor = 'grey.100';
  const iconBackColorOpen = 'grey.200';
  const isadmin = useSelector((state) => state.token.isadmin.isadmin);
  const myMobile = useSelector((state) => state.profile.contact.contact);
  useEffect(()=>{
    if(myMobile){
      setUserOnlineStatus(myMobile);
    }
  },[myMobile]);
  const mainHeader = (
    <Toolbar>
      {
        isadmin ?
          <IconButton
            disableRipple
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            color="secondary"
            sx={{ color: 'text.primary', bgcolor: open ? iconBackColorOpen : iconBackColor, ml: { xs: 0, lg: -2 } }}
          >
            {!open ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </IconButton>
          :
          <></>
      }

      <HeaderContent />
    </Toolbar>
  );

  const appBar = {
    position: 'fixed',
    color: 'inherit',
    elevation: 0,
    sx: {
      borderBottom: `1px solid ${theme.palette.divider}`
    }
  };

  return (
    <>
      {!matchDownMD && isadmin ? (
        <AppBarStyled open={open} {...appBar}>
          {mainHeader}
        </AppBarStyled>
      ) : (
        <AppBar {...appBar}>{mainHeader}</AppBar>
      )}
    </>
  );
};

Header.propTypes = {
  open: PropTypes.bool,
  handleDrawerToggle: PropTypes.func
};

export default Header;
