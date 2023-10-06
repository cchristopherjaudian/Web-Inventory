import { Grid, Snackbar } from '@mui/material';
import MainCard from 'components/MainCard';
import OrderTable from './OrderTable';
import OrderConfirmation from './OrderConfirmation';
import useAxios from 'hooks/useAxios';
import MuiAlert from '@mui/material/Alert';
import { useEffect, useState, forwardRef } from 'react';
const Orders = () => {
  const [message, setMessage] = useState('');
  const [orders, setOrders] = useState([]);
  const { data, fetchData } = useAxios('orders/admins', 'GET', null, false);
  const [selectedOrder, setSelectedOrder] = useState({});
  const [orderSteps, setOrderSteps] = useState([]);
  const [open, setOpen] = useState(false);
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert sx={{ color: 'white' }} elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const refreshTable = () => {
    fetchData();
  }
  useEffect(() => {
    if (data) {
      const result = data['data'].filter(item => item.status !== 'PAID').map(item => ({
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
  }, [data]);
  useEffect(() => {
    if (orderSteps) {
      console.log(orderSteps);
    }
  }, [orderSteps]);
  useEffect(() => {
    console.log('Selected Order');
    console.log(selectedOrder);
  }, [selectedOrder])
  return <MainCard title="Orders">
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
    <Grid container spacing={1}>
      <OrderTable refreshTable={refreshTable} setMessage={setMessage} handleClick={handleClick} orders={orders} setSelectedOrder={setSelectedOrder} setOrderSteps={setOrderSteps} />
      {selectedOrder && <OrderConfirmation setMessage={setMessage} handleClick={handleClick} selectedOrder={selectedOrder} orderSteps={orderSteps} />}
    </Grid>
  </MainCard>
};

export default Orders;
