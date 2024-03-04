import MainCard from 'components/MainCard';
import { Button, Divider, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const Payment = ({ order = {} }) => {
  const { accType } = useSelector((state) => state.profile.accType);
  let totalAmount = order['orderItems'].reduce((sum, item) => {
    if (accType === 'BUSINESS') {
      return sum + item.quantity * parseFloat(item.customPrice);
    }
    return sum + item.quantity * parseFloat(item.products.price);
  }, 0);

  function renderPaymentMethod(payMethod) {
    switch (payMethod) {
      case 'BANK_TRANSFER':
        return 'Bank Transfer';
      case 'PAY_LATER':
        return '30 Days Term';
      default:
        return payMethod;
    }
  }
  return (
    <MainCard>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Typography variant="body1">Subtotal</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            {'₱'}
            {Number(totalAmount).toLocaleString()}
          </Typography>
        </Grid>

        <Divider />

        <Grid item xs={6}>
          <Typography variant="body1">Payment Method</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">{renderPaymentMethod(order['paymentMethod'])}</Typography>
        </Grid>

        <Divider />
        <Grid item xs={6} sx={{ mt: 3 }}>
          <Typography variant="h4">Total</Typography>
        </Grid>
        <Grid item xs={6} sx={{ mt: 3 }}>
          <Typography variant="h4">
            {'₱'}
            {Number(totalAmount).toLocaleString()}
          </Typography>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default Payment;
