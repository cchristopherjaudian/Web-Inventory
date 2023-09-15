import PropTypes from 'prop-types';

import { ButtonBase } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import Logo from './Logo';

import { activeItem } from 'store/reducers/menu';


const LogoSection = ({ sx }) => {
  const { defaultId } = useSelector((state) => state.menu);
  const dispatch = useDispatch();
  return (
    <ButtonBase
      disableRipple
      onClick={() => dispatch(activeItem({ openItem: [defaultId] }))}
      sx={sx}
    >
      <Logo />
    </ButtonBase>
  );
};

LogoSection.propTypes = {
  sx: PropTypes.object
};

export default LogoSection;
