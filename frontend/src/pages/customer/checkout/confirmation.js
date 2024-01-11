import MainCard from 'components/MainCard';
import { Grid, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const Confirmation = () => {
  const navigate = useNavigate();
  return (
    <MainCard>
      <Grid container spacing={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Grid item xs={12}></Grid>
        <Typography variant="h3">THANKS FOR YOUR ORDER</Typography>
        <Typography variant="caption" mt={3}>
        Your order has been placed and will be processed as soon as possible.Make sure you make note of your order number. You will be updated throughout the process.
        </Typography>
        <Grid item xs={12} mt={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} gap={2}>
          <Button variant="contained" color="success" onClick={() => navigate('/shop', { replace: true })}>
            Go Back Shopping
          </Button>
          <Button variant="contained" color="primary" onClick={() => navigate('/history', { replace: true })}>
            View Invoices
          </Button>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default Confirmation;
