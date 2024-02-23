import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import CartItemList from './CartItemList';
import Customer from './customer';
import useAxios from 'hooks/useAxios';
const OrderInfo = () => {
  const { id } = useParams();
  const [orderInfo, setOrderInfo] = useState(null);
  const { data } = useAxios('orders/' + id, 'GET', null, false);

  useEffect(() => {
    if (data) {
      console.log('xxx', data);
      const mappedOrders = data?.data.orderItems.map((k) => ({
        ...k,
        products: {
          ...k.products,
          price: data.data.profile.account.accountType === 'BUSINESS' ? k.customPrice : k.products.price
        }
      }));
      data.data.orderItems = mappedOrders;
      setOrderInfo(data.data);
    }
  }, [data]);

  return (
    <Grid container>
      <Grid item xs={12} md={5}>
        {orderInfo && <Customer order={orderInfo} />}
      </Grid>
      <Grid item xs={12} md={7}>
        {orderInfo?.orderItems?.length > 0 &&
          orderInfo.orderItems?.map((s, i) => {
            return <CartItemList key={i} product={s} />;
          })}
      </Grid>
    </Grid>
  );
};

export default OrderInfo;
