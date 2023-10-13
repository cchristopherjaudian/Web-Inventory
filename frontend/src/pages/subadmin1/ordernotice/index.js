import MainCard from 'components/MainCard';
import Grid from '@mui/material/Grid';
import Searchbar from './searchbar';
import OrderTable from './OrderTable';
import useAxios from 'hooks/useAxios';
import { useEffect, useState } from 'react';

const OrderNotice = () => {

  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState(0);
  const [keyword, setKeyword] = useState('');
  const { data, fetchData } = useAxios('orders/admins', 'GET');

  useEffect(() => {
    if (data) {
      setOrders(data['data'].filter((item) => item.status !== 'PAID'));
    }
  }, [data]);
  useEffect(() => {
    console.log(filter);
    fetchData();
  }, [filter]);
  return <MainCard title="Order Notice">
    <Grid container>
      <OrderTable orderRows={orders} />
    </Grid>
  </MainCard>
};

export default OrderNotice;
