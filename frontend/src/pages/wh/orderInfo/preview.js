import { Grid } from '@mui/material';
import CartItemList from './CartItemList';
import Customer from './customer';
const Preview = ({ order = {} }) => {
  return (
    <Grid container>
      <Grid item xs={12} md={5}>
        <Customer order={order} />
      </Grid>
      <Grid item xs={12} md={7}>
        {order.orderItems.length > 0 &&
          order.orderItems?.map((s, i) => {
            return <CartItemList key={i} product={s} />;
          })}
      </Grid>
    </Grid>
  );
};

export default Preview;
