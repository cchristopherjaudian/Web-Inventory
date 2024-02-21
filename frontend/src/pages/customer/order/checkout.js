import { Grid } from '@mui/material';
import CartItemList from './CartItemList';
import Payment from './payment';
import { useSelector } from 'react-redux';
const Checkout = ({ order = {} }) => {
  const { accType } = useSelector((state) => state.profile.accType);
  const mappedItems = order.orderItems.map((k) => ({
    ...k,
    products: {
      ...k.products,
      price: accType.type === 'BUSINESS' ? k.customPrice : k.products.price
    }
  }));
  order.orderItems = mappedItems;
  return (
    <Grid container>
      <Grid item xs={12} md={4}>
        <Payment order={order} />
      </Grid>
      <Grid item xs={12} md={8}>
        {order.orderItems.length > 0 &&
          order.orderItems?.map((s, i) => {
            return <CartItemList key={i} product={s} />;
          })}
      </Grid>
    </Grid>
  );
};

export default Checkout;
