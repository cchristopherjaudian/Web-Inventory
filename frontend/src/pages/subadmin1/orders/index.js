import { Grid } from '@mui/material';
import MainCard from 'components/MainCard';
import OrderTable from './OrderTable';
import OrderConfirmation from './OrderConfirmation';
import useAxios from 'hooks/useAxios';
import { useEffect,useState } from 'react';
const Orders = () => {
const [orders, setOrders] = useState([]);
const { data, fetchData } = useAxios('orders/admins', 'GET',null,false);
const [selectedOrder,setSelectedOrder] = useState({});
const [orderSteps,setOrderSteps] = useState([]);
useEffect(()=>{
  if(data){
    const result = data['data'].map(item => ({
      createdAt: item.createdAt,
      id: item.id,
      paymentMethod: item.paymentMethod,
      status: item.status,
      firstname: item.profile.firstname,
      middlename: item.profile.middlename,
      lastname: item.profile.lastname,
    }));
    setOrders(result)
  }
},[data]);
useEffect(()=>{
  if(orderSteps){
    console.log(orderSteps);
  }
},[orderSteps]);
  return <MainCard title="Orders">
    <Grid container spacing={1}>
      <OrderTable orders = {orders} setSelectedOrder = {setSelectedOrder} setOrderSteps = {setOrderSteps}/>
      <OrderConfirmation selectedOrder = {selectedOrder} orderSteps = {orderSteps}/>
    </Grid>
  </MainCard>
};

export default Orders;
