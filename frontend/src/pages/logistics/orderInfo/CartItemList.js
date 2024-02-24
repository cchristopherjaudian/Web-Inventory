import { Divider, ListItemButton, ListItemAvatar, ListItemText, TextField, Typography } from '@mui/material';

import { DeleteOutlined } from '@ant-design/icons';
import { removeItem } from 'store/reducers/cart';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import useAxios from 'hooks/useAxios';

const CartItemList = (props) => {
  const product = props.product;
  console.log(product);
  return (
    <>
      <ListItemButton>
        <ListItemAvatar>
          <img
            src={product?.products.photoUrl ? product?.products.photoUrl : 'https://placehold.co/100'}
            alt={product?.products.name}
            width={100}
            height={100}
          />
        </ListItemAvatar>
        <ListItemText
          sx={{ ml: 2 }}
          primary={
            <Typography variant="h6">
              <Typography component="span" variant="subtitle1">
                {product?.products.name}
              </Typography>{' '}
            </Typography>
          }
          secondary={product?.products.code}
        />
        <ListItemText sx={{ display: 'flex', justifyContent: 'flex-end' }} primary={'₱' + product?.customPrice} />
        <ListItemText
          sx={{ display: 'flex', justifyContent: 'flex-end' }}
          primary={<TextField name="quantity" fullWidth id="quantity" label="Quantity" type="number" value={product?.quantity} />}
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
