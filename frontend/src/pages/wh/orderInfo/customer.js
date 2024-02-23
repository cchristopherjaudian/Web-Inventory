import MainCard from 'components/MainCard';
import { Grid, Typography } from '@mui/material';

const Customer = (props) => {
  if (!props.order) return;
  console.log('props.order', props.order);
  const cartItems = props.order['orderItems'];
  const subtotal =
    cartItems && Object.keys(cartItems).length
      ? cartItems.reduce((sum, item) => {
          return sum + item.quantity * parseFloat(item.products.price);
        }, 0)
      : 0;

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
    <>
      <MainCard>
        <Grid container spacing={1}>
          <Grid item xs={12} sx={{ p: 1, display: 'flex', direction: 'row', justifyContent: 'space-between' }}>
            <Typography variant="h5">ORDER NO:</Typography>
            <Typography variant="h5" sx={{ color: '#3498db' }}>
              {props.order?.id}
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{ ml: -1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <img src={props.order?.profile.photoUrl} alt="CustomerDP" width={120} height={120} />
          </Grid>
          <Grid item xs={9} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Grid container spacing={1}>
              <Grid item xs={12} sx={{ display: 'flex', direction: 'row', justifyContent: 'space-between' }}>
                <Typography variant="body1">Requester Name</Typography>
                <Typography variant="body1" sx={{ color: '#3498db' }}>
                  {props.order?.profile.fullName}
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', direction: 'row', justifyContent: 'space-between' }}>
                <Typography variant="body1">Email Address</Typography>
                <Typography variant="body1" sx={{ color: '#3498db' }}>
                  {props.order?.profile.emailAddress}
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', direction: 'row', justifyContent: 'space-between' }}>
                <Typography variant="body1">Address</Typography>
                <Typography variant="body1" sx={{ color: '#3498db' }}>
                  {props.order?.profile.address}
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', direction: 'row', justifyContent: 'space-between' }}>
                <Typography variant="body1">Contact Number</Typography>
                <Typography variant="body1" sx={{ color: '#3498db' }}>
                  {props.order?.profile.account.username}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </MainCard>
      <MainCard>
        <Grid container spacing={1}>
          <Grid item xs={12} sx={{ display: 'flex', direction: 'row', justifyContent: 'space-between' }}>
            <Typography variant="body1">Subtotal</Typography>
            <Typography variant="body1">₱{subtotal}</Typography>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', direction: 'row', justifyContent: 'space-between' }}>
            <Typography variant="body1">Payment Method</Typography>
            <Typography variant="body1">{renderPaymentMethod(props.order['paymentMethod'])}</Typography>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', direction: 'row', justifyContent: 'space-between', mt: 2 }}>
            <Typography variant="h4">Total</Typography>
            <Typography variant="h4">₱{subtotal}</Typography>
          </Grid>
        </Grid>
      </MainCard>
    </>
  );
};

export default Customer;
