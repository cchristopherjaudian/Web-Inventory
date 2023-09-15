import MainCard from 'components/MainCard';
import Grid from '@mui/material/Grid';
import Searchbar from './searchbar';
import AccountTable from './AccountTable';

const OrderNotice = () => (
  <MainCard title="Order Notice">
    <Grid container>
      <Searchbar/>
      <AccountTable/>
    </Grid>
  </MainCard>
);

export default OrderNotice;
