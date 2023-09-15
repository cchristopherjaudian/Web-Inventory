import { Grid } from '@mui/material';
import MainCard from 'components/MainCard';
import OrderTable from './OrderTable';
import OrderConfirmation from './OrderConfirmation';
const Orders = () => (
  <MainCard title="Orders">
    <Grid container spacing={1}>
      <OrderTable/>
      <OrderConfirmation/>
    </Grid>
  </MainCard>
);

export default Orders;
