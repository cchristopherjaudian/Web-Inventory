import {
  Button,
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
  const updateProduct = (field, value) => {
    props.updateProductProperty(props.product.code, { [field]: value });
  };
  return (
    <>
      <Grid container alignItems="center" justify="center" style={{ marginBottom: '10px' }} spacing={2}>
        <Grid item xs={12} md={3}>
          <ListItemAvatar style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={props.product.photoUrl ? props.product.photoUrl : 'https://placehold.co/100'}
              alt={props.product.name}
              width={100}
              height={100}
            />

            <ListItemText
              sx={{ ml: 2 }}
              primary={
                <Typography variant="h6">
                  <Typography component="span" variant="subtitle1">
                    {props.product.name}
                  </Typography>{' '}
                </Typography>
              }
              secondary={props.product.code}
            />
          </ListItemAvatar>
        </Grid>

        <Grid item xs={12} md={3}>
          <ListItemText primary={props.product.price} />
        </Grid>

        <Grid item xs={12} md={3}>
          <ListItemText
            sx={{ display: 'flex', justifyContent: 'flex-start' }}
            primary={
              <TextField
                name="quantity"
                fullWidth
                id="quantity"
                label="Quantity"
                onChange={(e) => updateProduct('quantity', Number(e.target.value))}
              />
            }
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <ListItemText
            sx={{ display: 'flex', justifyContent: 'flex-start' }}
            primary={
              <FormControlLabel
                control={<Checkbox onChange={(e) => updateProduct('isSelected', e.target.checked)} />}
                label="Add to Request"
              />
            }
          />
        </Grid>
      </Grid>

      <Divider />
    </>
  );
};

export default CartItemList;
