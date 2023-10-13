import { useState, useEffect } from 'react';
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
import { FormControl, InputAdornment, OutlinedInput } from '@mui/material';
import { SearchOutlined } from '@ant-design/icons';
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const SalesReport = () => {
  const [dateFilter, setDateFilter] = useState({ txfrom: new Date().toLocaleDateString('en-CA'), txTo: new Date().toLocaleDateString('en-CA') });
  const [slot, setSlot] = useState('week');
  const data = [
    { label: 'Product Info 1', value: 400, id: 0 },
    { label: 'Product Info 2', value: 300, id: 1 }
  ];
  const [value, setValue] = useState(0);
  const handleFilter = (e) => {
    let newFilter = { ...dateFilter, [e.target.name]: e.target.value };
    setDateFilter(newFilter);
    console.log(dateFilter);
  }
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
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} sx={{ mt: 2 }}>
                  <FormControl sx={{ width: '90%', mt: 1 }}>
                    <OutlinedInput
                      size="small"
                      type="date"
                      id="txfrom"
                      name="txfrom"
                      inputProps={{
                        'aria-label': 'weight'
                      }}
                      onClick={handleFilter}
                      value={dateFilter['txfrom']}
                    />
                  </FormControl>
                  <Typography variant="h5"> to </Typography>
                  <FormControl sx={{ width: '90%', mt: 1 }}>
                    <OutlinedInput
                      size="small"
                      type="date"
                      id="txTo"
                      name="txTo"
                      inputProps={{
                        'aria-label': 'weight'
                      }}
                      onClick={handleFilter}
                      value={dateFilter['txTo']}
                    />
                  </FormControl>
                  <Button sx={{ width: '60%', pl: 2, pr: 2 }} endIcon={<SearchOutlined />} size="medium" variant="contained">Filter</Button>

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
          <Tabs value={value} onChange={handleChange} aria-label="order-tabs">
            <Tab label="All Orders" {...a11yProps(0)} />
            <Tab label="Preparing" {...a11yProps(1)} />
            <Tab label="Dispatched" {...a11yProps(2)} />
            <Tab label="Delivered" {...a11yProps(3)} />
          </Tabs>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <OrderTable />
      </Grid>
    </Grid>
  );


};

export default SalesReport;
