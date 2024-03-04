import { LoadingOutlined } from '@ant-design/icons';
import MainCard from 'components/MainCard';
import { Button, Grid, InputLabel, MenuItem, Select, FormControl, Typography, FormControlLabel, Checkbox } from '@mui/material';
import { useState, useEffect } from 'react';
import Option from 'pages/customer/checkout/option';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const HeadInfo = (props) => {
  const navigate = useNavigate();
  const customerInfo = props.customerInfo;
  const orderInfo = props.orderInfo;
  const orderItems = props.orderItems;
  const accType = customerInfo.account?.accountType === 'BUSINESS' ? 'B2B' : 'B2C';
  const [paymethod, setPaymethod] = useState('');
  const totalAmount =
    orderItems.length > 0 &&
    orderItems?.reduce((sum, item) => {
      const price = accType === 'B2B' ? item.customPrice : item.products.price;
      return (sum += item.quantity * price);
    }, 0);

  const handleChange = (event) => {
    props.setPaymethod(event.target.value);
    setPaymethod(event.target.value);
    props.setShowQR(true);
  };

  return (
    <MainCard>
      <Grid container spacing={1}>
        <Grid item xs={4} sx={{ ml: -1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <img src={customerInfo.photoUrl} alt="CustomerDP" width={150} height={150} />
        </Grid>
        <Grid item xs={8} spacing={1}>
          <Grid item xs={12} sx={{ display: 'flex', direction: 'row', justifyContent: 'space-between' }}>
            <Typography variant="body1">Requester Name</Typography>
            <Typography variant="body1" sx={{ color: '#3498db' }}>
              {customerInfo.fullName}
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', direction: 'row', justifyContent: 'space-between' }}>
            <Typography variant="body1">Email Address</Typography>
            <Typography variant="body1" sx={{ color: '#3498db' }}>
              {customerInfo.emailAddress}
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', direction: 'row', justifyContent: 'space-between' }}>
            <Typography variant="body1">Contact Number</Typography>
            <Typography variant="body1" sx={{ color: '#3498db' }}>
              {customerInfo.account?.username}
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', direction: 'row', justifyContent: 'space-between' }}>
            <Typography variant="body1">Address</Typography>
            <Typography variant="body1" sx={{ color: '#3498db' }}>
              {customerInfo.address}
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', direction: 'row', justifyContent: 'space-between' }}>
            <Typography variant="body1">Payment Method</Typography>
            <Typography variant="body1" sx={{ color: '#3498db' }}>
              {orderInfo.paymentMethod}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <MainCard sx={{ mt: 2 }}>
            <Grid container>
              <Grid item xs={12} sx={{ display: 'flex', direction: 'row', justifyContent: 'space-between' }}>
                <Typography variant="body1">Subtotal:</Typography>
                <Typography variant="body1">₱{Number(totalAmount).toLocaleString()}</Typography>
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', direction: 'row', justifyContent: 'space-between' }}>
                <Typography variant="h4">Total</Typography>
                <Typography variant="h4" sx={{ color: '#c0392b' }}>
                  ₱{Number(totalAmount).toLocaleString()}
                </Typography>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>

        <Grid item xs={12} sx={{ mt: 2 }}>
          <Button color="primary" variant="contained" fullWidth onClick={() => props.setShowUpload(true)}>
            DELIVERY RECEIPT
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button color="success" variant="contained" fullWidth onClick={() => navigate('/', { replace: true })}>
            BACK
          </Button>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default HeadInfo;
