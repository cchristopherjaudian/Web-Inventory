import { Grid } from '@mui/material';
import MainCard from 'components/MainCard';
import Header from './header';
import Data from './data';
import { useState, useEffect } from 'react';
import useAxios from 'hooks/useAxios';
const RouteSched = () => {
  const [listRoutes, setListRoutes] = useState([]);
  const [listSchedule, setListSchedule] = useState([]);
  const [listspap, setListspap] = useState([]);
  const [listtruck, setListtruck] = useState([]);
  const { data } = useAxios('schedules', 'GET', null, false);

  useEffect(() => {
    if (data) {
      const newRoutes = [];
      const newSched = [];
      const newSpap = [];
      const newTruck = [];

      if (data?.data.length > 0) {
        data['data'].forEach((s, i) => {
          newRoutes.push({ route: s?.route, id: s?.id });
          newSched.push({ description: s?.description, id: s?.id });
          newSpap.push({ spap: s?.profile?.fullName || 'N/A', id: s?.id });
          newTruck.push({ plate: s?.plateNumber, id: s?.id });
        });
        setListRoutes(newRoutes);
        setListSchedule(newSched);
        setListspap(newSpap);
        setListtruck(newTruck);
      }
    }
  }, [data]);
  return (
    <MainCard title="Route Schedule">
      <Grid container spacing={1.5}>
        <Grid item xs={12} lg={3} direction="column">
          <Header title="ROUTES" img="/asset/routes.png" />
          {listRoutes.map((item, index) => {
            return <Data field="route" title={item.route} rowId={item.id} key={index} background={index % 2 === 0 ? '#f2f2f2' : 'white'} />;
          })}
        </Grid>
        <Grid item xs={12} lg={3} direction="column">
          <Header title="SCHEDULE" img="./asset/schedule.png" />
          {listSchedule.map((item, index) => {
            return (
              <Data
                field="description"
                title={item?.description}
                rowId={item.id}
                key={index}
                color="red"
                background={index % 2 === 0 ? '#f2f2f2' : 'white'}
              />
            );
          })}
        </Grid>
        <Grid item xs={12} lg={3} direction="column">
          <Header title="SP/AP" img="./asset/03.png" />
          {listspap.map((item, index) => {
            return (
              <Data field="description" title={item.spap} rowId={item.id} key={index} background={index % 2 === 0 ? '#f2f2f2' : 'white'} />
            );
          })}
        </Grid>
        <Grid item xs={12} lg={3} direction="column">
          <Header title="TRUCK" img="./asset/truck.png" />
          {listtruck.map((item, index) => {
            return (
              <Data field="plateNumber" title={item.plate} rowId={item.id} key={index} background={index % 2 === 0 ? '#f2f2f2' : 'white'} />
            );
          })}
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default RouteSched;
