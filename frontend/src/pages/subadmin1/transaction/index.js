import TransactionTable from './TransactionTable';
import CustomerInfo from './customerinfo';
import { useState, useEffect } from 'react';
import { Box, Button, Grid, Stack, Tab, Tabs, Typography } from '@mui/material';
import useAxios from 'hooks/useAxios';
import useHighAxios from 'hooks/useHighAxios';
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}
const TransactionRecords = () => {
  const [status, setStatus] = useState('B2C');
  const tabStatus = ['B2C', 'B2B'];
  const [value, setValue] = useState(0);
  const [businessTransactions, setBusinessTransactions] = useState([]);
  const [customerTransactions, setCustomerTransactions] = useState([]);
  const { data, fetchData } = useAxios('orders/transactions?account=BUSINESS', 'GET');
  const { highData, highFetchData } = useHighAxios('orders/transactions?account=CUSTOMER', 'GET');
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setStatus(tabStatus[newValue]);
  };
  const retrieveTransactions = () => {
    if (value === 0) {
      fetchData();
    } else {
      highFetchData();
    }
  }
  useEffect(() => {
    if (data) {
      let newData = data['data'].map((d, i) => {
        return { ...d, id: i };
      });
      setBusinessTransactions(newData);
    }
  }, [data]);
  useEffect(() => {
    if (highData) {
      let newData = highData['data'].map((d, i) => {
        return { ...d, id: i };
      });
      setCustomerTransactions(newData);
    }
  }, [highData]);
  return (
    <>
      <CustomerInfo retrieveTransactions={retrieveTransactions} />
      <Grid item xs={12}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="order-tabs">
            <Tab label="B2C" {...a11yProps(0)} />
            <Tab label="B2B" {...a11yProps(1)} />
          </Tabs>
        </Box>
      </Grid>
      <TransactionTable transactions={value === 0 ? customerTransactions : businessTransactions} />
    </>
  );
};

export default TransactionRecords;
