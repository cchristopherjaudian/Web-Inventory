import { Grid, TextField, Box, Typography } from '@mui/material';
import CartItemList from './CartItemList';
import { useState } from 'react';
const Cart = (props) => {
  const newCart = props.productList;

  return (
    <Grid container sx={{ mt: 2 }}>
      <Grid item xs={12}>
        {newCart?.map((s, i) => {
          return <CartItemList key={i} product={s}/>;
        })}
      </Grid>
    </Grid>
  );
};

export default Cart;
