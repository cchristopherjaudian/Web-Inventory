import { Avatar, Box, Divider, Typography, Button, Paper, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const PaymentReminder = (props) => {
  const navigate = useNavigate();
  const myMobile = useSelector((state) => state.profile.contact.contact);
  const isBot = props.src !== myMobile;
  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: 'white',
        p: 2,
        display: 'flex',
        justifyContent: isBot ? 'flex-start' : 'flex-end',
        mb: 2
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: isBot ? 'row' : 'row-reverse',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ p: 2, bgcolor: isBot ? 'primary.main' : 'secondary.main' }}>{isBot ? 'O' : 'U'}</Avatar>
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            ml: isBot ? 0 : 1,
            mr: isBot ? 1 : 0,
            backgroundColor: '#fafafa',
            borderRadius: '20px 20px 20px 5px'
          }}
        >
          <Grid container>
            <Grid item align="center" sx={{ textAlign: 'center', px: 10 }}>
              <img src="asset/oxiaire.png" alt="payment_logo" width={200} height={100} />
              <Divider sx={{ borderWidth: 1, px: 2 }} />
              <Typography variant="h6" sx={{ mt: 3 }}>
                Payment Reminder
              </Typography>
              <Divider variant="inset" sx={{ borderWidth: 1, px: 2, my: 3 }} />
              <Typography variant="h2" gutterBottom>
                ₱ {props.html.price}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Due on <span style={{ color: 'red' }}>{props.html.deadlineDate}</span>
              </Typography>
              <Typography variant="body1" gutterBottom>
                Hello Customer,
              </Typography>
              <Typography variant="body1" gutterBottom>
                Our records show that we are still waiting payment of <span style={{ fontWeight: 'bold' }}>₱ {props.html.price}</span> for
                Invoice {props.html.orderId}, which was initially sent on <span style={{ color: 'red' }}>{props.html.orderDate}</span>. A
                copy of original Invoice has been attached for your convenience in the instance that it has been lost or misplaced.
              </Typography>
              <Typography variant="body1" gutterBottom>
                If Payment has been sent, please disregard this reminder. Please let us know if you have any questions or need assistance
                with the payment process.
              </Typography>
              <Typography variant="body1" gutterBottom>
                Thank you,
              </Typography>
              <Typography variant="h5" gutterBottom>
                OXIARE GAS ENTERPRISES
              </Typography>
              <Button variant="contained" onClick={() => navigate('/order/' + props.html.orderId)}>
                PAY INVOICE
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
};

export default PaymentReminder;
