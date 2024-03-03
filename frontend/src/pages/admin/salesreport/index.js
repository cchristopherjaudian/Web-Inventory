import { useState, useEffect } from 'react';
import MainCard from 'components/MainCard';
import IncomeAreaChart from './IncomeAreaChart';
import RadialChart from './RadialChart';
import OrderTable from './SalesTable';
import { Box, Button, Grid, Stack, Tab, Tabs, Typography } from '@mui/material';
import { FormControl, InputAdornment, OutlinedInput } from '@mui/material';
import { SearchOutlined } from '@ant-design/icons';
import useAxios from 'hooks/useAxios';
import useMetricsAxios from 'hooks/useMetricsAxios';
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const SalesReport = () => {
  const [query, setQuery] = useState('');
  const [salesQuery, setSalesQuery] = useState('');
  const [dateFilter, setDateFilter] = useState({
    txFrom: new Date().toLocaleDateString('en-CA'),
    txTo: new Date().toLocaleDateString('en-CA')
  });
  const [slot, setSlot] = useState('week');
  const [orders, setOrders] = useState([]);
  const [radial, setRadial] = useState(null);
  const [chart, setChart] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [status, setStatus] = useState('DELIVERED');
  const [accountStatus, setAccountStatus] = useState('CUSTOMER');
  const [value, setValue] = useState(2);
  const [accountValue, setAccountValue] = useState(0);
  const { data, fetchData } = useAxios(query, 'GET');
  const { metricsData, metricsFetchData } = useMetricsAxios(salesQuery, 'GET');
  const tabStatus = ['PREPARING', 'DISPATCHED', 'DELIVERED'];
  const tabAccount = ['CUSTOMER', 'BUSINESS'];
  const handleFilterClick = () => {
    setQuery('metrics/reports?startsAt=' + dateFilter['txFrom'] + '&endsAt=' + dateFilter['txTo'] + '&status=' + status + '&account=' + accountStatus);
    setSalesQuery('metrics/sales?startsAt=' + dateFilter['txFrom'] + '&endsAt=' + dateFilter['txTo']);
  };
  const handleFilter = (e) => {
    let newFilter = { ...dateFilter, [e.target.name]: e.target.value };
    setDateFilter(newFilter);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setStatus(tabStatus[newValue]);
  };
  const handleAccountChange = (event, newValue) => {
    setAccountValue(newValue);
    setAccountStatus(tabAccount[newValue]);
  };
  useEffect(() => {
    if (dateFilter && status && accountStatus) {
      setQuery('metrics/reports?startsAt=' + dateFilter['txFrom'] + '&endsAt=' + dateFilter['txTo'] + '&status=' + status + '&account=' + accountStatus);
      setSalesQuery('metrics/sales?startsAt=' + dateFilter['txFrom'] + '&endsAt=' + dateFilter['txTo']);
    }
  }, [dateFilter, status, accountStatus]);
  useEffect(() => {
    if (query) {
      fetchData();
    }
  }, [query]);
  useEffect(() => {
    if (salesQuery) {
      metricsFetchData();
    }
  }, [salesQuery]);
  useEffect(() => {
    if (data) {
      let radialSrc = data['data']['sales'];

      const newData = data['data']['list'].map((d, i) => {
        return {
          id: d['orderId'],
          fullName: d['customerName'],
          itemnumber: d['itemsCount'],
          paymentMethod: d['paymentMethod'],
          price: d['totalPrice'],
          dateOrdered: d['dateOrdered'],
          dateDispatched: d['dispatchedDate'],
          dateDelivered: d['dateDelivered']
        };
      });
      setRadial(radialSrc);
      setOrders(newData);
    }
  }, [data]);
  useEffect(() => {
    if (metricsData) {
      const incomeData = metricsData['data'];
      setSalesData(incomeData);
    }
  }, [metricsData]);
  useEffect(() => {
    fetchData();
    metricsFetchData();
  }, []);
  return (
    <Grid container spacing={0.5}>
      <Grid item xs={12} md={3}>
        <MainCard content={false} sx={{ mt: 1.5 }}>
          <Typography variant="h6" sx={{ mt: 2.0, mb: 3.0, ml: 2.0 }}>
            Earnings
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 275 }}>
            {<RadialChart radialData={radial} />}
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
                      id="txFrom"
                      name="txFrom"
                      inputProps={{
                        'aria-label': 'weight'
                      }}
                      onChange={handleFilter}
                      value={dateFilter['txFrom']}
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
                      onChange={handleFilter}
                      value={dateFilter['txTo']}
                    />
                  </FormControl>
                  <Button
                    sx={{ width: '60%', pl: 2, pr: 2 }}
                    endIcon={<SearchOutlined />}
                    size="medium"
                    variant="contained"
                    onClick={handleFilterClick}
                  >
                    Filter
                  </Button>
                </Stack>
              </Grid>
              <Grid item>
                <Typography variant="h5"></Typography>
              </Grid>
            </Grid>
            {<IncomeAreaChart salesData={salesData} />}
          </Box>
        </MainCard>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="order-tabs">
            <Tab label="Preparing" {...a11yProps(0)} />
            <Tab label="Dispatched" {...a11yProps(1)} />
            <Tab label="Delivered" {...a11yProps(2)} />
          </Tabs>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Tabs value={accountValue} onChange={handleAccountChange} aria-label="order-tabs">
          <Tab label="B2C List" {...a11yProps(0)} />
          <Tab label="B2B List" {...a11yProps(1)} />
        </Tabs>
        <OrderTable orders={orders} />
      </Grid>
    </Grid>
  );
};

export default SalesReport;
