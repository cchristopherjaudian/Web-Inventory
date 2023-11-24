import MainCard from 'components/MainCard';

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { IconButton, Button, Box, Chip, Typography, Card, CardMedia, CardActions, CardContent, Grid, CardActionArea } from '@mui/material';
import { setCart } from 'store/reducers/cart';
import { useSelector, useDispatch } from 'react-redux';
import useAxios from 'hooks/useAxios';
import useAxiosBackup from 'hooks/useAxiosBackup';
import RelatedProducts from './related';
import Info from './info';
import useInventoryAxios from 'hooks/useInventoryAxios';

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState({});
  const [itemInfo, setItemInfo] = useState({});
  const [cartItem, setCartItem] = useState({});
  const cartItems = useSelector((state) => state.cart.cart);
  const { data, fetchData } = useAxios('products/' + id, 'GET');
  const { inventoryData, inventoryFetchData } = useInventoryAxios('products/' + id + '/inventories', 'GET', null, false);
  const { profile, fetchProfile } = useAxiosBackup('carts', 'POST', selectedProduct);

  const OtherProduct = () => {
    return (
      <Card>
        <CardActionArea>
          <CardMedia component="img" width="300" height="300" image={'https://www.placehold.co/300'} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              product name
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Size:xxxx
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Content: xxx
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Button size="small" color="secondary" variant="outlined" onClick={() => navigate('/product/' + product.id)}>
              Learn More
            </Button>
          </Box>
        </CardActions>
      </Card>
    );
  };
  useEffect(() => {
    if (id) {
      fetchData();
      inventoryFetchData();
    } else {
      navigate('/');
    }
  }, [id]);
  useEffect(() => {
    if (data) {
      setItemInfo(data['data']);
    }
  }, [data]);
  useEffect(() => {
    if (Object.keys(cartItem).length !== 0) {
      const newSelectedProduct = { code: cartItem['code'], quantity: 1 };
      setSelectedProduct(newSelectedProduct);
    }
  }, [cartItem]);
  useEffect(() => {
    if (Object.keys(cartItem).length !== 0) {
      fetchProfile(selectedProduct);
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (profile) {
      if (profile['status'] === 200) {
        let newCart = [...cartItems];
        const dispatchProduct = { ...profile['data'], products: cartItem };
        let objectIndex = cartItems.findIndex((item) => item.products.code === cartItem.code);
        if (objectIndex === -1) {
          newCart.push(dispatchProduct);
        } else {
          newCart[objectIndex] = dispatchProduct;
        }
        dispatch(setCart(newCart));
        setSelectedProduct({});
        setCartItem({});
      }
    }
  }, [profile]);

  return (
    <MainCard>
      <Grid container spacing={1}>
        <Grid item md={8} xs={12}>
          <Info itemInfo={itemInfo} inventoryData={inventoryData} setCartItem={setCartItem} cartItems={cartItems} productId={id} />
          <Card mt={2} sx={{ width: '100%', display: 'flex', padding: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h3" color="#2980b9">
                Product Information
              </Typography>
              <Typography variant="body1" mt={1}>
                {itemInfo?.description || ''}
              </Typography>
            </Box>
          </Card>
        </Grid>

        <Grid item md={3} xs={12} alignItems="center" justifyContent="center">
          <Typography gutterBottom variant="h3" component="div">
            Other Products
          </Typography>

          <OtherProduct />
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default Product;
