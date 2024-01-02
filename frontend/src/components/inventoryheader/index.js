import { Grid } from '@mui/material';
import MainCard from 'components/MainCard';
import Analytics from 'components/cards/statistics/Analytics';
import { useState, useEffect } from 'react';

const InventoryHeader = (props) => {
  const [metrics, setMetrics] = useState({});
  useEffect(() => {
    if (props.metrics) {
      setMetrics(props.metrics);
    }
  }, [props.metrics]);
  return (
    <Grid item xs={12}>
      <MainCard title="Overall Inventory">
        <Grid container rowSpacing={1} columnSpacing={2.75} sx={{ mt: -3 }}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Analytics color="primary" title="Categories" count={metrics['categories']} extra="Last 7 days" />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Analytics color="warning.main" title="Total Products" count={metrics['products']} extra="Last 7 days" />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Analytics color="#8e44ad" title="Top Selling" count={metrics['topSelling']} extra="Last 7 days" />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Analytics color="error" title="Low Stocks" count={metrics['lowStocks']} extra="Ordered" />
          </Grid>
        </Grid>
      </MainCard>
    </Grid>
  );
};

export default InventoryHeader;
