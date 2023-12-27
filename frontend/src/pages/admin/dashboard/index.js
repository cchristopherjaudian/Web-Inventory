import MainCard from 'components/MainCard';
import IncomeAreaChart from './IncomeAreaChart';
import RadialChart from './RadialChart';
import ReportTable from './ReportTable';
import InventoryHeader from 'components/inventoryheader/index';
import useMetricsAxios from 'hooks/useMetricsAxios';
import useHighAxios from 'hooks/useHighAxios';
import useLowAxios from 'hooks/useLowAxios';
import useRadialAxios from 'hooks/useRadialAxios';
import useIncomeAxios from 'hooks/useIncomeAxios';
import { useState, useEffect } from 'react';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';

import { FormControl, InputAdornment, OutlinedInput } from '@mui/material';
import { SearchOutlined } from '@ant-design/icons';

const Dashboard = () => {
  const [radial, setRadial] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [radialQuery, setRadialQuery] = useState('');
  const [incomeQuery, setIncomeQuery] = useState('');
  const [lowStocks, setLowStocks] = useState([]);
  const [highStocks, setHighStocks] = useState([]);
  const [metrics, setMetrics] = useState({});
  const { metricsData, fetchMetricsData } = useMetricsAxios('metrics/panels', 'GET', null, false);
  const { lowData, fetchLowData } = useLowAxios('inventories?stock=LOW', 'GET', null, false);
  const { highData, fetchHighData } = useHighAxios('inventories?stock=HIGH', 'GET', null, false);
  const [dateFilter, setDateFilter] = useState({
    txFrom: new Date().toLocaleDateString('en-CA'),
    txTo: new Date().toLocaleDateString('en-CA')
  });
  const { radialData, fetchRadialData } = useRadialAxios(radialQuery, 'GET');
  const { incomeData, fetchIncomeData } = useIncomeAxios(incomeQuery, 'GET');

  const handleFilter = (e) => {
    let newFilter = { ...dateFilter, [e.target.name]: e.target.value };
    setDateFilter(newFilter);
  };
  const handleButtonFilter = () => {
    fetchRadialData();
    fetchIncomeData();
  };
  useEffect(() => {
    if (dateFilter) {
      setRadialQuery('/metrics/reports?startsAt=' + dateFilter['txFrom'] + '&endsAt=' + dateFilter['txTo'] + '&status=DELIVERED');
      setIncomeQuery('/metrics/sales?startsAt=' + dateFilter['txFrom'] + '&endsAt=' + dateFilter['txTo']);
    }
  }, [dateFilter]);
  useEffect(() => {
    if (radialQuery) {
      fetchRadialData();
    }
  }, [radialQuery]);
  useEffect(() => {
    if (radialData) {
      let radialSrc = radialData['data']['sales']['code'];
      setRadial(radialSrc);
    }
  }, [radialData]);
  useEffect(() => {
    if (incomeQuery) {
      fetchIncomeData();
    }
  }, [incomeQuery]);
  useEffect(() => {
    if (incomeData) {
      const incomeDataNew = incomeData['data'];
      setSalesData(incomeDataNew);
    }
  }, [incomeData]);
  useEffect(() => {
    if (metricsData) {
      setMetrics(metricsData['data']);
    }
  }, [metricsData]);
  useEffect(() => {
    if (lowData) {
      let newData = [];
      lowData['data'].map((d, i) => {
        newData.push({
          id: i,
          code: d['products']['code'],
          name: d['products']['name'],
          quantity: d['stock']
        });
      });

      setLowStocks(newData);
    }
  }, [lowData]);
  useEffect(() => {
    if (highData) {
      let newData = [];
      highData['data'].map((d, i) => {
        newData.push({
          id: i,
          code: d['products']['code'],
          name: d['products']['name'],
          quantity: d['stock']
        });
      });
      setHighStocks(newData);
    }
  }, [highData]);
  useEffect(() => {
    handleButtonFilter();
  }, []);
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <InventoryHeader metrics={metrics} />
      <Grid item xs={12} sx={{ mb: -5.0 }}>
        <Typography variant="h5">Sales Report</Typography>
      </Grid>
      <Grid item xs={12} md={4}>
        <MainCard content={false} sx={{ mt: 1.5 }}>
          <Typography variant="h4" sx={{ mt: 2.0, ml: 2.0 }}>
            Earnings
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 320 }}>
            {radial.length > 0 && <RadialChart radialData={radial}/>}
          </Box>
        </MainCard>
      </Grid>
      <Grid item xs={12} md={8}>
        <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

        <MainCard content={false} sx={{ mt: 1.5 }}>
          <Box sx={{ py: 1, px: 2 }}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="h4">Sales</Typography>
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
                    onClick={handleButtonFilter}
                  >
                    Filter
                  </Button>
                </Stack>
              </Grid>
              <Grid item>
                <Typography variant="h5"></Typography>
              </Grid>
            </Grid>
            {salesData && <IncomeAreaChart salesData={salesData} />}
          </Box>
        </MainCard>
      </Grid>
      <Grid item xs={12} sx={{ mb: -5.0 }}>
        <Typography variant="h5">Product Stock</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <MainCard sx={{ mt: 2 }} content={false}>
          <Typography variant="h6" sx={{ mt: 2.0, ml: 2.0 }}>
            Low Quantity Stock
          </Typography>
          <ReportTable products={lowStocks} />
        </MainCard>
      </Grid>
      <Grid item xs={12} md={6}>
        <MainCard sx={{ mt: 2 }} content={false}>
          <Typography variant="h6" sx={{ mt: 2.0, ml: 2.0 }}>
            High Quantity Stock
          </Typography>
          <ReportTable products={highStocks} />
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
