import { IconButton, Button, Box, Chip, Typography, Card, CardMedia, CardContent, Grid } from '@mui/material';
import { ShoppingCartOutlined, HeartOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
const InfoV2 = (props) => {
  const [stock, setStock] = useState(0);
  const [productInfo, setProductInfo] = useState({});
  useEffect(() => {
    if (props.inventoryData) {
      let data = props.inventoryData?.data;

      if (data) {
        setStock(data.productInventories[0]?._sum.stock || 0);
      }
    }
  }, [props.inventoryData]);

  return (
    <Card sx={{ width: '100%', display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardMedia
          component="img"
          height="300"
          width="300"
          image={props.itemInfo.photoUrl ? props.itemInfo.photoUrl : 'https://placehold.co/300'}
          alt="placeholder"
        />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography gutterBottom variant="h4">
              {props.itemInfo.name}{' '}
              <Chip label={props?.itemInfo?.size || null} sx={{ background: 'red', fontWeight: 700, color: 'white', fontSize: '16px' }} />
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {stock} stocks available
          </Typography>
          {
            props.isBusiness === 0 && <Typography mt={3} variant="body1" color="#2980b9">
              Price: ₱{Number(props.itemInfo.price).toLocaleString()}
            </Typography>
          }
         
          <Grid container spacing={0.2} mt={2}>
            <Grid item xs={6}>
              <Typography variant="body2">Availability</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="#2980b9">
                {stock > 0 ? 'In Stock' : 'Out of Stock'}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">Category</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="#2980b9">
                {props.itemInfo.category}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">Walk in | Deliver</Typography>
            </Grid>
            <Grid item xs={12} mt={4}>
              {props.cartItems.some((obj) => obj.id === props.id) ? (
                <Button variant="contained" color="success" startIcon={<ShoppingCartOutlined />}>
                  Added
                </Button>
              ) : stock > 0 ? (
                props.isBusiness === 0 && (
                  <Button variant="contained" startIcon={<ShoppingCartOutlined />} onClick={() => props.setCartItem(props.itemInfo)}>
                    Add to Cart
                  </Button>
                )
              ) : (
                <Button variant="contained" color="error" startIcon={<CloseCircleOutlined />}>
                  Out of Stock
                </Button>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Box>
    </Card>
  );
};

export default InfoV2;
