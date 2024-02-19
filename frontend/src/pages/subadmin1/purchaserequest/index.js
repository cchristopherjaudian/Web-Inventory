import { Grid } from '@mui/material';
import MainCard from 'components/MainCard';
import OrderTable from './OrderTable';
import Searchbar from './searchbar';
import useAxios from 'hooks/useAxios';
import { useEffect, useState } from 'react';
const PurchaseRequest = () => {
  const [prList, setPrList] = useState([]);
  const { data } = useAxios('purchase/pending', 'GET', null, false);

  useEffect(() => {
    if (data?.data?.length) {
      setPrList(() => [...data.data]);
    }
  }, [data]);
  return (
    <MainCard title="Purchase Request List">
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Searchbar />
        </Grid>
        <Grid item xs={12}>
          <OrderTable orderRows={prList} />
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default PurchaseRequest;
