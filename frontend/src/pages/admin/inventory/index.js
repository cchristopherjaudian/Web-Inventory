import {
  Grid,
} from '@mui/material';

import MainCard from 'components/MainCard';
import ProductQuantity from './ProductQuantity';
import InventoryTable from './InventoryTable';
import InventoryHeader from 'components/inventoryheader/index';
const Inventory = () => (
  <Grid container direction="row" spacing={1}>
    <InventoryHeader/>

    <Grid item xs={12} md={6} >
      <Grid direction="column" container>
        <Grid item xs={12} >
          <MainCard title="Product Stocks" sx={{ width: '100%' }}>
            <InventoryTable/>
          </MainCard>
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12} md={6}>
      <Grid direction="column" container spacing={0.5} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Grid item xs={12} style={{ display: 'flex', flex: 1 }}>
          <MainCard title="Low Quantity Stock" sx={{ width: '100%' }}>
            <Grid direction="row" container spacing={0.8} sx={{ mt: -4 }}>
              <ProductQuantity />
              <ProductQuantity />
              <ProductQuantity />
              <ProductQuantity />
              <ProductQuantity />
              <ProductQuantity />
            </Grid>
          </MainCard>
        </Grid>
        <Grid item xs={12} style={{ display: 'flex', flex: 1 }}>
          <MainCard title="High Quantity Stock" sx={{ width: '100%' }}>
            <Grid direction="row" container spacing={0.8} sx={{ mt: -4 }}>
              <ProductQuantity />
              <ProductQuantity />
              <ProductQuantity />
              <ProductQuantity />
              <ProductQuantity />
              <ProductQuantity />
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

export default Inventory;
