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
  Typography
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
      <ListItemButton style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        <ListItemAvatar>
          <img
            src={props.product.photoUrl ? props.product.photoUrl : 'https://placehold.co/100'}
            alt={props.product.name}
            width={100}
            height={100}
          />
        </ListItemAvatar>
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
        <ListItemText sx={{ display: 'flex' }} primary={props.product.price} />
        <ListItemText
          sx={{ display: 'flex' }}
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
        <ListItemText
          sx={{ display: 'flex' }}
          primary={
            <FormControlLabel
              control={<Checkbox onChange={(e) => updateProduct('isSelected', e.target.checked)} />}
              label="Add to Request"
            />
          }
        />
      </ListItemButton>

      <Divider />
    </>
  );
};

export default CartItemList;
