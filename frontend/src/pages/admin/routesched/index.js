import { Grid } from '@mui/material';
import MainCard from 'components/MainCard';
import Header from './header';
import Data from './data';
const RouteSched = () => {
  const listRoutes = ['MALUPATA/LUCENA', 'SILANGAN', 'SARCANTIAO', 'INFANTA', 'KANLURAN'];
  const listSchedule = ['TUESDAY, THURSDAY, SATURDAY 8AM-5PM', 'WEDNESDAY AND SATURDAY 3AM', 'MONDAY, WEDNESDAY AND FRIDAY 7AM - 4PM', 'THURSDAY 3AM', 'MONDAY THURSDAY'];
  const listspap = ['N/A', 'N/A', 'N/A', 'N/A', 'N/A'];
  const listtruck = ['CAO 1371', 'NET 3800', 'AAO 4525', 'NET 3800', 'NET 3800'];
  return (
    <MainCard title="Route Schedule">
      <Grid container spacing={1.5}>
        <Grid item xs={12} lg={3} direction="column">
          <Header title="ROUTES" img="/asset/routes.png" />
          {listRoutes.map((item, index) => {
            return <Data title={item} key={index} background={(index % 2 === 0) ? '#f2f2f2' : 'white'} />
          })}
        </Grid>
        <Grid item xs={12} lg={3} direction="column">
          <Header title="SCHEDULE" img="./asset/schedule.png" />
          {listSchedule.map((item, index) => {
            return <Data title={item} key={index} color='red' background={(index % 2 === 0) ? '#f2f2f2' : 'white'} />
          })}
        </Grid>
        <Grid item xs={12} lg={3} direction="column">
          <Header title="SP/AP" img="./asset/03.png" />
          {listspap.map((item, index) => {
            return <Data title={item} key={index} background={(index % 2 === 0) ? '#f2f2f2' : 'white'} />
          })}
        </Grid>
        <Grid item xs={12} lg={3} direction="column">
          <Header title="TRUCK" img="./asset/truck.png" />
          {listtruck.map((item, index) => {
            return <Data title={item} key={index} background={(index % 2 === 0) ? '#f2f2f2' : 'white'} />
          })}
        </Grid>
      </Grid >

    </MainCard >);
};

export default RouteSched;
