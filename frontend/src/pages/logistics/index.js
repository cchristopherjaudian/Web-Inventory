import { Grid, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import MainCard from 'components/MainCard';
import OrderTable from './OrderTable';
import { forwardRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Dispatched = () => {
  const { token } = useSelector((state) => state.token.token);
  const [dispatchedOrders, setDispatchedOrders] = useState(null);

  const logiClient = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL || '',
    timeout: 10000,
    headers: {
      Authorization: token
    }
  });

  const fetchDispatchOrders = async () => {
    const { data: response } = await logiClient.get('/orders/status/dispatched');

    setDispatchedOrders(() => response?.data);
  };

  useEffect(() => {
    console.log('dispatchedOrders', dispatchedOrders);
  }, [dispatchedOrders]);

  // onmount
  useEffect(() => {
    // const { data } = await logiClient.get('/orders/dispatched');
    fetchDispatchOrders();
  }, []);

  // const Alert = forwardRef(function Alert(props, ref) {
  //   return <MuiAlert sx={{ color: 'white' }} elevation={6} ref={ref} variant="filled" {...props} />;
  // });
  return (
    <>
      <MainCard title="Orders">
        {/* <Snackbar open={open} autoHideDuration={3000}>
          <Alert severity="success" sx={{ width: '100%' }}>
            test
          </Alert>
        </Snackbar> */}
        <Grid container spacing={1}>
          {dispatchedOrders?.length > 0 && <OrderTable orders={dispatchedOrders} />}
        </Grid>
      </MainCard>
    </>
  );
};

export default Dispatched;
