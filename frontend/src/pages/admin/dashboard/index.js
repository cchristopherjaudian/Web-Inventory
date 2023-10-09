
import MainCard from 'components/MainCard';
import IncomeAreaChart from './IncomeAreaChart';
import RadialChart from './RadialChart';
import ReportTable from './ReportTable';
import InventoryHeader from 'components/inventoryheader/index';
import useMetricsAxios from 'hooks/useMetricsAxios';
import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Grid,
  Stack,
  Typography
} from '@mui/material';


const Dashboard = () => {
  const [slot, setSlot] = useState('week');
  const [metrics, setMetrics] = useState({});
  const { metricsData, fetchMetricsData } = useMetricsAxios('metrics/panels', 'GET',null,false);
  const data = [
    { label: 'Product Info 1', value: 400, id: 0 },
    { label: 'Product Info 2', value: 300, id: 1 }
  ];
  useEffect(() => {
    if (metricsData) {
      setMetrics(metricsData['data']);
    }
  }, [metricsData]);
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <InventoryHeader metrics={metrics}/>
      <Grid item xs={12} sx={{ mb: -5.0 }}>
        <Typography variant="h5">Sales Report</Typography>
      </Grid>
      <Grid item xs={12} md={3}>

        <MainCard content={false} sx={{ mt: 1.5 }}>
          <Typography variant="h6" sx={{ mt: 2.0, ml: 2.0 }}>Earnings</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

            <RadialChart />
          </Box>
        </MainCard>
      </Grid>
      <Grid item xs={12} md={9}>
        <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

        <MainCard content={false} sx={{ mt: 1.5 }}>

          <Box sx={{ py: 1, px: 2 }}>
            <Grid container alignItems="center" justifyContent="space-between">

              <Grid item>
                <Stack direction="row" alignItems="center" spacing={0}>
                  <Button
                    size="small"
                    onClick={() => setSlot('day')}
                    color={slot === 'day' ? 'primary' : 'secondary'}
                    variant={slot === 'day' ? 'outlined' : 'text'}
                  >
                    Daily
                  </Button>
                  <Button
                    size="small"
                    onClick={() => setSlot('week')}
                    color={slot === 'week' ? 'primary' : 'secondary'}
                    variant={slot === 'week' ? 'outlined' : 'text'}
                  >
                    Weekly
                  </Button>
                  <Button
                    size="small"
                    onClick={() => setSlot('month')}
                    color={slot === 'month' ? 'primary' : 'secondary'}
                    variant={slot === 'month' ? 'outlined' : 'text'}
                  >
                    Monthly
                  </Button>
                  <Button
                    size="small"
                    onClick={() => setSlot('annual')}
                    color={slot === 'annual' ? 'primary' : 'secondary'}
                    variant={slot === 'annual' ? 'outlined' : 'text'}
                  >
                    Annually
                  </Button>
                </Stack>
              </Grid>
              <Grid item>
                <Typography variant="h5"></Typography>
              </Grid>
            </Grid>
            <IncomeAreaChart />
          </Box>
        </MainCard>
      </Grid>
      <Grid item xs={12} sx={{ mb: -5.0 }}>
        <Typography variant="h5">Product Stock</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <MainCard sx={{ mt: 2 }} content={false}>
          <Typography variant="h6" sx={{ mt: 2.0, ml: 2.0 }}>Low Quantity Stock</Typography>
          <ReportTable />
        </MainCard>
      </Grid>
      <Grid item xs={12} md={6}>
        <MainCard sx={{ mt: 2 }} content={false}>
          <Typography variant="h6" sx={{ mt: 2.0, ml: 2.0 }}>High Quantity Stock</Typography>
          <ReportTable />
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
