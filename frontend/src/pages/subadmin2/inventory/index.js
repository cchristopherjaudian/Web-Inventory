import {
  Box,
  Button,
  Grid,
  TextField
} from '@mui/material';


import MainCard from 'components/MainCard';
import InventoryTable from './InventoryTable';
import InventoryHeader from 'components/inventoryheader/index';

const handleSubmit = (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  console.log({
    email: data.get('email'),
    password: data.get('password'),
  });
};

const Inventory = () => (
  <Grid container direction="row" spacing={1}>
    <InventoryHeader />

    <Grid item xs={12} md={8} >
      <Grid direction="column" container>
        <Grid item xs={12} >
          <MainCard title="Products" sx={{ width: '100%' }}>
            <InventoryTable />
          </MainCard>
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12} md={4}>
      <MainCard title="New Product" sx={{ width: '100%' }}>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: -3, height: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                name="name"
                required
                fullWidth
                id="name"
                label="Product Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                fullWidth
                id="id"
                label="Product ID"
                name="id"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="category"
                label="Category"
                name="category"
                autoComplete="category"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="buyingprice"
                label="Buying Price"
                name="buyingprice"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="quantity"
                label="Quantity"
                name="quantity"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="unit"
                label="Unit"
                name="unit"
                autoComplete="unit"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="threshold"
                label="Threshold Value"
                name="threshold"
              />
            </Grid>
          </Grid>

        </Box>
        <Box sx={{ mb: 2, mt: 2 }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
          >
            Update
          </Button>
          <Button
            sx={{ mt: 1 }}
            color="error"
            fullWidth
            variant="contained"
          >
            Cancel
          </Button>
        </Box>

      </MainCard>
    </Grid>
  </Grid>
);

export default Inventory;
