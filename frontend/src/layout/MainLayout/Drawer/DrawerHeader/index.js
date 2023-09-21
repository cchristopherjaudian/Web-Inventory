import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Stack } from '@mui/material';
import DrawerHeaderStyled from './DrawerHeaderStyled';
import Logo from 'components/Logo';
import { useSelector } from 'react-redux';
const DrawerHeader = ({ open }) => {
  const theme = useTheme();
  const isadmin = useSelector((state) => state.token.isadmin.isadmin);
  return (
    isadmin ?
      <DrawerHeaderStyled theme={theme} open={open}>
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
          <Logo />
        </Stack>
      </DrawerHeaderStyled>
      : <></>
  );
};

DrawerHeader.propTypes = {
  open: PropTypes.bool
};

export default DrawerHeader;
