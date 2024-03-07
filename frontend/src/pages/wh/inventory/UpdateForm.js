import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxios from 'hooks/useAxios';
import ProductInfo from './ProductInfo';
import { Grid } from '@mui/material';
import UpdateInventoryTable from './UpdateInventoryTable';
import InventoryForm from './InventoryForm';
const UpdateForm = () => {
  const params = useParams();
  const productId = params.id;
  const [urlId, setUrlId] = useState('');
  const { data, fetchData } = useAxios('products/' + urlId + '/stocks', 'GET');

  const [info, setInfo] = useState({});

  useEffect(() => {
    if (data) {
      setInfo(data['data']);
    }
  }, [data]);
  useEffect(() => {
    setUrlId(productId);
  }, [productId]);
  useEffect(() => {
    if (urlId !== '') fetchData();
  }, [urlId]);
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        {info && <ProductInfo info={info} />}
      </Grid>
      <Grid item xs={12} md={8}>
        {info && <UpdateInventoryTable info={info} />}
      </Grid>
      <Grid item xs={12} md={4}>
        <InventoryForm fetchData={fetchData} productId={productId} />
      </Grid>
    </Grid>
  );
};

export default UpdateForm;
