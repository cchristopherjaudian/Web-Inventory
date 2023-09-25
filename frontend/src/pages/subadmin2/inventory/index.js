import {
  Grid
} from '@mui/material';
import MainCard from 'components/MainCard';
import InventoryTable from './InventoryTable';
import InventoryHeader from 'components/inventoryheader/index';
import ProductForm from './ProductForm';
import useAxios from 'hooks/useAxios';
import { useState, useEffect } from 'react';



const Inventory = () => {
  const [productList, setProductList] = useState([]);
  const { data, loading, error, fetchData } = useAxios('products', 'GET', null, false);
  useEffect(() => {
    if (data) {
      setProductList(data['data']);
    }
  }, [data]);
  const updateTable = (product) => {
    setProductList([...productList, product]);
  }

  return (
    <Grid container direction="row" spacing={1}>
      <InventoryHeader />

      <Grid item xs={12} lg={8} >
        <Grid direction="column" container>
          <Grid item xs={12} >
            <MainCard title="Products" sx={{ width: '100%' }}>
              <InventoryTable products={productList} />
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
      <ProductForm updateTable={updateTable} />
    </Grid>);
};

export default Inventory;
