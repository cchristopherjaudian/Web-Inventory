import { Grid } from '@mui/material';
import MainCard from 'components/MainCard';
import Header from './header';
import Data from './data';
const RouteSched = () => (
  <MainCard title="Route Schedule">
    <Grid container spacing={0.5}>
      <Grid item xs={12} lg={3} direction="column">
        <Header title="ROUTES" img="/asset/routes.png" />
        <Data title="Eyyy" />
        <Data title="Eyyy" />
      </Grid>
      <Grid item xs={12} lg={3} direction="column">
        <Header title="SCHEDULE" img="./asset/schedule.png" />
        <Data title="Eyyy" />
      </Grid>
      <Grid item xs={12} lg={3} direction="column">
        <Header title="SP/AP" img="./asset/03.png" />
        <Data title="Eyyy" />
        <Data title="Eyyy" />
        <Data title="Eyyy" />
      </Grid>
      <Grid item xs={12} lg={3} direction="column">
        <Header title="TRUCK" img="./asset/truck.png" />
        <Data title="Eyyy" />
      </Grid>
    </Grid >

  </MainCard >
);

export default RouteSched;
