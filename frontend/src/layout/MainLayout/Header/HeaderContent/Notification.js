import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { useTheme } from '@mui/material/styles';
import {
  Badge,
  Button,
  Box,
  ClickAwayListener,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  Popper,
  Typography,
  useMediaQuery
} from '@mui/material';

import CartItemList from './CartItemList';
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';
import { useSelector } from 'react-redux';
import { CloseOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

const actionSX = {
  mt: '6px',
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',

  transform: 'none'
};


const Notification = () => {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const iconBackColorOpen = 'grey.300';
  const iconBackColor = 'grey.100';
  let cartItems = useSelector((state) => state.cart.cart);
  const proceedCheckout = () => {
    const zeroQuantity = cartItems.filter((c) => (Number(c.quantity) < 1));
    if (zeroQuantity.length > 0) {
      Swal.fire({
        title: 'Cart Checkout',
        text: 'Please input a valid quantity for each item',
        icon: 'info'
      });
    } else {
      setOpen(false);
      navigate('/checkout')
    }

  }
  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <IconButton
        disableRipple
        color="secondary"
        size="large"
        sx={{ color: 'text.primary', bgcolor: open ? iconBackColorOpen : iconBackColor }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Badge badgeContent={cartItems.length} color="primary">
          <ShoppingCartOutlined />
        </Badge>
      </IconButton>
      <Popper
        placement={matchesXs ? 'bottom' : 'bottom-end'}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [matchesXs ? -5 : 0, 9]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            <Paper
              sx={{
                boxShadow: theme.customShadows.z1,
                width: 500,
                minWidth: 385,
                maxWidth: 500,
                [theme.breakpoints.down('md')]: {
                  maxWidth: 500
                }
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  title="My Cart"
                  elevation={0}
                  border={false}
                  content={false}
                  secondary={
                    <IconButton size="small" onClick={handleToggle}>
                      <CloseOutlined />
                    </IconButton>
                  }
                >
                  <List
                    component="nav"
                    sx={{
                      p: 0,
                      '& .MuiListItemButton-root': {
                        py: 0.5,
                        '& .MuiAvatar-root': avatarSX,
                        '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
                      }
                    }}
                  >
                    {cartItems.map((item, index) => {
                      return <CartItemList key={index} item={item} cartReduxId={item.id} />
                    })}
                    {
                      cartItems.length > 0 &&
                      <ListItemButton sx={{ textAlign: 'center', py: `${12}px !important` }}>
                        <ListItemText
                          primary={
                            <Button variant="outlined" color="success" onClick={proceedCheckout}>
                              Proceed to Checkout
                            </Button>

                          }
                        />
                      </ListItemButton>
                    }

                  </List>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default Notification;
