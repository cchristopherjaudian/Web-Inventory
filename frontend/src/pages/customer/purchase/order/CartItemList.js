import { Divider, ListItemButton, ListItemAvatar, ListItemText, TextField, Typography } from '@mui/material';

import { DeleteOutlined } from '@ant-design/icons';
import { removeItem } from 'store/reducers/cart';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import useAxios from 'hooks/useAxios';

const CartItemList = (props) => {
  return (
    <>
      <ListItemButton>
        <ListItemAvatar>
          <img
            src={props.product.products.photoUrl ? props.product.products.photoUrl : 'https://placehold.co/100'}
            alt={props.product.products.name}
            width={100}
            height={100}
          />
        </ListItemAvatar>
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
        <ListItemText sx={{ display: 'flex', justifyContent: 'flex-end' }} primary={'₱' + props.product.products.price} />
        <ListItemText
          sx={{ display: 'flex', justifyContent: 'flex-end' }}
          primary={<TextField name="quantity" fullWidth id="quantity" label="Quantity" type="number" value={props.product.quantity} />}
        />

        {/* <Button variant="contained" color="error" size="medium" sx={{ ml: 2 }} startIcon={<DeleteOutlined />} >
                Remove
            </Button> */}
      </ListItemButton>

      <Divider />
    </>
  );
};

export default CartItemList;
