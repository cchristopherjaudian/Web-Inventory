import { LoadingOutlined } from '@ant-design/icons';
import { Button, Grid, TextField, Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Header = (props) => {
  const navigate = useNavigate();
  const customerInfo = props.customerInfo;
  const orderInfo = props.orderInfo;
  return (
    <Box>
      <Grid container spacing={1.5}>
        <Grid item xs={12} container justifyContent="flex-end">
          <Button variant="outlined" onClick={() => navigate('/pr')}>
            Back to Request List
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h2" align="center">
            Purchase Request Form
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ mt: 3 }}>
          <Grid container spacing={1.5}>
            <Grid item xs={12} md={6}>
              <TextField name="name" fullWidth id="name" value={customerInfo.fullName} disabled />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField name="dateRequested" value={orderInfo?.dateRequested?.substring(0, 10)} disabled fullWidth id="dateRequested" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField name="phoneNumber" fullWidth id="phoneNumber" value={customerInfo.businessName} disabled />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField name="dateRequired" value={orderInfo?.dateRequired?.substring(0, 10)} disabled fullWidth id="dateRequired" />
            </Grid>
            <Grid item xs={12} sx={{ mt: 3 }}>
              <TextField name="email" fullWidth id="email" value={customerInfo.emailAddress} disabled />
            </Grid>
            <Grid item xs={12}>
              <TextField name="address" value={customerInfo.address} fullWidth id="address" disabled />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container spacing={1.5}></Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Header;
