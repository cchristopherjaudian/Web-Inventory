import {
  Button,
  Box,
  Checkbox,
  Divider,
  FormGroup,
  FormControlLabel,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  OutlinedInput,
  FormControl,
  FormHelperText,
  InputAdornment,
  TextField,
  Typography,
  Grid
} from '@mui/material';

import { ShoppingOutlined } from '@ant-design/icons';
import { removeItem } from 'store/reducers/cart';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import useAxios from 'hooks/useAxios';

const CartItemList = (props) => {
  return (
    <>
      <Grid container alignItems="center" justify="center" style={{ marginBottom: '10px' }} spacing={2}>
        <Grid item xs={12} md={3}>
          <ListItemAvatar style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={props.product.products.photoUrl ? props.product.products.photoUrl : 'https://placehold.co/100'}
              alt={props.product.products.name}
              width={100}
              height={100}
            />

            <ListItemText
              sx={{ ml: 2 }}
              primary={
                <Typography variant="h6">
                  <Typography component="span" variant="subtitle1">
                    {props.product.products.name}
                  </Typography>{' '}
                </Typography>
              }
              secondary={props.product.products.code}
            />
          </ListItemAvatar>
        </Grid>
        <Grid item xs={12} md={3}>
          
        </Grid>
        <Grid item xs={12} md={3}>
          <ListItemText
            sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}
            primary="Quantity"
            secondary={
              <Box display="block">
                <TextField
                  name="quantity"
                  disabled
                  fullWidth
                  id="quantity"
                  value={props.product.quantity}
                />
              </Box>
            }
          />

        </Grid>
      </Grid>
      <Divider />
    </>
  );
};

export default CartItemList;
