import { useState } from 'react';
import MainCard from 'components/MainCard';
import IncomeAreaChart from './IncomeAreaChart';
import RadialChart from './RadialChart';
import OrderTable from './SalesTable';
import {
  Box,
  Button,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography
} from '@mui/material';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const SalesReport = () => {
  const [slot, setSlot] = useState('week');
  const data = [
    { label: 'Product Info 1', value: 400, id: 0 },
    { label: 'Product Info 2', value: 300, id: 1 }
  ];
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Grid container spacing={0.5}>
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
      <Grid item xs={12}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="All Orders" {...a11yProps(0)} />
            <Tab label="On Delivery" {...a11yProps(1)} />
            <Tab label="Delivered" {...a11yProps(2)} />
            <Tab label="Cancelled" {...a11yProps(3)} />
          </Tabs>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <OrderTable/>
      </Grid>
    </Grid>
  );


};

export default SalesReport;
