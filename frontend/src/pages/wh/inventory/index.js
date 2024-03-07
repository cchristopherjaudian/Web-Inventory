import { Box, Grid, Tab, Tabs } from '@mui/material';
import MainCard from 'components/MainCard';
import InventoryTable from './InventoryTable';
import InventoryHeader from 'components/inventoryheader/index';
import ProductForm from './ProductForm';
import InventoryStatus from './InventoryStatus';
import useAxios from 'hooks/useAxios';
import useInventoryAxios from 'hooks/useInventoryAxios';
import useMetricsAxios from 'hooks/useMetricsAxios';
import useHighAxios from 'hooks/useHighAxios';
import useLowAxios from 'hooks/useLowAxios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const Inventory = () => {
  const [productPayload, setProductPayload] = useState({});
  const { inventoryData, inventoryFetchData } = useInventoryAxios('threshold', 'POST', productPayload);

  const [productList, setProductList] = useState([]);
  const [metrics, setMetrics] = useState({});
  const { metricsData, fetchMetricsData } = useMetricsAxios('metrics/panels', 'GET', null, false);
  const { data, loading, error, fetchData } = useAxios('products', 'GET', null, false);
  const tabStatus = ['STATUS', 'ADD PRODUCT'];
  const tabAccount = ['STATUS', 'ADD PRODUCT'];
  const [status, setStatus] = useState('DELIVERED');
  const [currentTab, setCurrentTab] = useState('STATUS');
  const [value, setValue] = useState(0);
  const { lowData, fetchLowData } = useLowAxios('inventories?stock=LOW', 'GET', null, false);
  const { highData, fetchHighData } = useHighAxios('inventories?stock=HIGH', 'GET', null, false);
  const [lowStocks, setLowStocks] = useState([]);
  const [highStocks, setHighStocks] = useState([]);
  const updateProduct = (target, value) => {
    alert(1);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setStatus(tabStatus[newValue]);
  };

  const updateThreshold = () => {
    if (Object.keys(productPayload).length > 0) {
      console.log(productPayload);
      inventoryFetchData();
    }
  };
  useEffect(() => {
    if (inventoryData) {
      if (inventoryData.status === 200) {
        setProductPayload({});
        Swal.fire({
          title: 'Update Product',
          text: 'Threshold updated successfully',
          icon: 'success'
        });
      } else {
        Swal.fire({
          title: 'Update Product',
          text: 'Failed to update threshold. Please try again.',
          icon: 'error'
        });
      }
    }
  }, [inventoryData]);
  useEffect(() => {
    if (data) {
      setProductList(data['data']['products']);
    }
  }, [data]);
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
          // id: i,
          photoUrl: d['products']['photoUrl'],
          code: d['products']['code'],
          name: d['products']['name'],
          quantity: d['stock'],
          indicator: d['stockIndicator']
        });
      });
      setLowStocks(newData);
    }
  }, [lowData]);
  useEffect(() => {
    if (highData) {
      let newData = [];
      console.log('highData', highData);
      highData['data'].map((d, i) => {
        newData.push({
          id: i,
          photoUrl: d['products']['photoUrl'],
          code: d['products']['code'],
          name: d['products']['name'],
          quantity: d['stock'],
          indicator: d['stockIndicator']
        });
      });
      setHighStocks(newData);
    }
  }, [highData]);
  const updateTable = (product) => {
    setProductList([...productList, product]);
  };

  return (
    <Grid container direction="row" spacing={1}>
      <InventoryHeader metrics={metrics} />

      <Grid item xs={12} lg={8}>
        <Grid direction="column" container>
          <Grid item xs={12}>
            <MainCard title="Products" sx={{ width: '100%' }}>
              <InventoryTable products={productList} updateThreshold={updateThreshold} setProductPayload={setProductPayload} />
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={4}>
        <InventoryStatus lowStocks={lowStocks} highStocks={highStocks} />
      </Grid>
    </Grid>
  );
};

export default Inventory;
