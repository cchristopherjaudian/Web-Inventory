import MainCard from 'components/MainCard';

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Box, Typography, Card, Chip, CardMedia, IconButton, CardContent, Grid, CardActionArea } from '@mui/material';
import { setCart } from 'store/reducers/cart';
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import useAxios from 'hooks/useAxios';
import useAxiosBackup from 'hooks/useAxiosBackup';
import useInventoryAxios from 'hooks/useInventoryAxios';
import InfoV2 from './infov2';

const OtherProduct = ({ product, setCartItem }) => {
  const navigate = useNavigate();
  return (
    <Card style={{ paddingBottom: '10px' }}>
      <CardActionArea>
        <div style={{ position: 'relative' }}>
          <CardMedia
            component="img"
            width="300"
            height="300"
            image={product?.photoUrl ? product?.photoUrl : 'https://www.placehold.co/300'}
            style={{ maxWidth: '100%' }}
          />
          <Chip
            label={product?.size || null}
            sx={{ position: 'absolute', background: 'red', float: 'left', top: 0, fontWeight: 700, color: 'white', fontSize: '16px' }}
          />
        </div>
        <CardActionArea
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <IconButton variant="contained">
            <HeartOutlined />
          </IconButton>
          <IconButton variant="contained" onClick={() => setCartItem(product)}>
            <ShoppingCartOutlined />
          </IconButton>
        </CardActionArea>
        <CardContent spacing={3}>
          <Typography gutterBottom variant="h3" component="div">
            {product?.name}
          </Typography>
          <Typography variant="h4" color="text.secondary" style={{ marginBottom: '10px' }}>
            &#x20B1; {product?.price}.00
          </Typography>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Button size="small" color="secondary" variant="outlined" onClick={() => navigate('/product/' + product.id)}>
              Learn More
            </Button>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

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
          <InfoV2 itemInfo={itemInfo} inventoryData={inventoryData} setCartItem={setCartItem} cartItems={cartItems} productId={id} />
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

          {inventoryData?.data.list.length > 0 &&
            inventoryData?.data.list.map((product) => {
              return <OtherProduct key={product?.id} product={product} setCartItem={setCartItem} />;
            })}
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default Product;
