import {
  Grid,
} from '@mui/material';

import MainCard from 'components/MainCard';
import ProductQuantity from './ProductQuantity';
import InventoryTable from './InventoryTable';
import InventoryHeader from 'components/inventoryheader/index';
import useMetricsAxios from 'hooks/useMetricsAxios';
import { useState, useEffect } from 'react';
import useAxios from 'hooks/useAxios';
import useLowAxios from 'hooks/useLowAxios';
import useHighAxios from 'hooks/useHighAxios';

const Inventory = () => {
  const [metrics, setMetrics] = useState({});
  const { metricsData, fetchMetricsData } = useMetricsAxios('metrics/panels', 'GET', null, false);
  const { data } = useAxios('products', 'GET', null, false);
  const { lowData } = useLowAxios('inventories?stock=LOW', 'GET', null, false);
  const { highData } = useHighAxios('inventories?stock=HIGH', 'GET', null, false);
  const [inventory, setInventory] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [highStock, setHighStock] = useState([]);

  useEffect(() => {
    if (metricsData) {
      setMetrics(metricsData['data']);
    }
  }, [metricsData]);
  useEffect(() => {
    if (data) {
      setInventory(data['data']['products']);
    }
  }, [data]);
  useEffect(() => {
    if (lowData) {
      let newData = [];
      lowData['data'].map((d, i) => {
        newData.push({
          id: i,
          photoUrl: d['products']['photoUrl'],
          code: d['products']['code'],
          name: d['products']['name'],
          quantity: d['stock'],
          indicator: d['stockIndicator']
        })
      });
      console.log(newData);
      setLowStock(newData);
    }
  }, [lowData]);
  useEffect(() => {
    if (highData) {
      let newData = [];
      highData['data'].map((d, i) => {
        newData.push({
          id: i,
          photoUrl: d['products']['photoUrl'],
          code: d['products']['code'],
          name: d['products']['name'],
          quantity: d['stock'],
          indicator: d['stockIndicator']
        })
      });
      setHighStock(newData);
    }
  }, [highData]);
  return <Grid container direction="row" spacing={1}>
    <InventoryHeader metrics={metrics} />

    <Grid item xs={12} md={6} >
      <Grid direction="column" container>
        <Grid item xs={12} >
          <MainCard title="Product Stocks" sx={{ width: '100%' }}>
            <InventoryTable inventory={inventory} />
          </MainCard>
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12} md={6}>
      <Grid direction="column" container spacing={0.5} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Grid item xs={12} style={{ display: 'flex', flex: 1 }}>
          <MainCard title="Low Quantity Stock" sx={{ width: '100%' }}>
            <Grid direction="row" container spacing={0.8} sx={{ mt: -4 }}>
              {
                lowStock.map((stock, index) => {
                  return <ProductQuantity stock={stock} key={index} />
                })
              }
            </Grid>
          </MainCard>
        </Grid>
        <Grid item xs={12} style={{ display: 'flex', flex: 1 }}>
          <MainCard title="High Quantity Stock" sx={{ width: '100%' }}>
            <Grid direction="row" container spacing={0.8} sx={{ mt: -4 }}>
              {
                highStock.map((stock, index) => {
                  return <ProductQuantity stock={stock} key={index} />
                })
              }
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
};

export default Inventory;
