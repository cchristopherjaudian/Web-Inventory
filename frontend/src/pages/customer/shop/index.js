import MainCard from 'components/MainCard';
import {
  Snackbar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CardActions,
  FormControl,
  InputLabel,
  Grid,
  Select,
  MenuItem,
  Typography,
  TextField
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAxios from 'hooks/useAxios';
import useAxiosBackup from 'hooks/useAxiosBackup';
import { useState, useEffect, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from 'store/reducers/cart';
import MuiAlert from '@mui/material/Alert';
const Shop = () => {
  const isBusiness = useSelector((state) => state.token.customertype.customertype);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reduxcart = useSelector((state) => state.cart.cart);
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert sx={{ color: 'white' }} elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [products, setProducts] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  const [selectedProduct, setSelectedProduct] = useState({});
  const [cartItem, setCartItem] = useState({});
  const { data, fetchData } = useAxios('products' + (searchItem ? '?search=' + searchItem : ''), 'GET', null, true);
  const { profile, fetchProfile } = useAxiosBackup('carts', 'POST', selectedProduct);
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (data) {
      setProducts(data['data']['products']);
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
    fetchData();
  }, []);
  useEffect(() => {
    if (!searchItem) fetchData();
  }, [searchItem]);
  useEffect(() => {
    if (profile) {
      if (profile['status'] === 200) {
        let newCart = [...reduxcart];
        const dispatchProduct = { ...profile['data'], products: cartItem };
        let objectIndex = reduxcart.findIndex((item) => item.products.code === cartItem.code);
        if (objectIndex === -1) {
          newCart.push(dispatchProduct);
        } else {
          newCart[objectIndex] = dispatchProduct;
        }
        dispatch(setCart(newCart));
        setSelectedProduct({});
        setCartItem({});
        setMessage('Product has been added to cart');
        setOpen(true);
      }
    }
  }, [profile]);
  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      <Grid item xs={12}>
        <img src="asset/featured-image.png" alt="featured" height={500} style={{ width: '100%' }} />
      </Grid>

      <Grid item xs={12} sx={{ mt: 3 }}>
        <MainCard>
          <form style={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              id="searchProduct"
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
              label="Search"
              variant="outlined"
              sx={{ width: '300px' }}
            />
            <Button variant="contained" color="primary" sx={{ ml: 2 }} onClick={() => fetchData()}>
              Search
            </Button>
            <Button variant="contained" color="secondary" type="reset" sx={{ ml: 1 }} onClick={() => setSearchItem('')}>
              Clear
            </Button>
          </form>
        </MainCard>
      </Grid>

      {products.map((product, index) => {
        return (
          <Grid item xs={3} key={index}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  width="300"
                  height="300"
                  image={product.photoUrl ? product.photoUrl : 'https://www.placehold.co/300'}
                  alt={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name.substring(0, 30)}
                    {product.name.length > 30 && '....'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Size: {product.size}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Content: {product.price}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Box display="flex" justifyContent="space-between" width="100%">
                  <Button size="small" color="secondary" variant="outlined" onClick={() => navigate('/product/' + product.id)}>
                    Learn More
                  </Button>
                  {isBusiness === 0 && (
                    <Button size="small" color="primary" variant="contained" onClick={() => setCartItem(product)}>
                      Add to Cart
                    </Button>
                  )}
                </Box>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Shop;
