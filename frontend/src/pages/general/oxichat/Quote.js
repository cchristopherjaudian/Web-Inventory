import { Avatar, Box, Divider, Typography, Button, Paper, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Quote = (props) => {
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
                QUOTATION
              </Typography>
              <Divider variant="inset" sx={{ borderWidth: 1, px: 2, my: 3 }} />
              <Typography variant="h6" sx={{ mt: 3 }}>
                Greetings!
              </Typography>
              <Divider variant="inset" sx={{ borderWidth: 1, px: 2, my: 3 }} />
              <Typography variant="body1" gutterBottom>
                I hope this message finds you well. Thank you for considering Oxiaire Gas Enterprises for your medical needs.
              </Typography>
              <Typography variant="body1" gutterBottom>
                Please view the attached quotation as requested. Should you have any questions or require further clarifications, please don&apos;t hesistate to reach out. We&apos;re here to assist you every step of the way.
              </Typography>
              <Typography variant="body1" gutterBottom>
                We value your business and look forward to the opportunity working with you.
              </Typography>
              <Typography variant="body1" gutterBottom>
                Best Regards,
              </Typography>
              <Typography variant="h5" gutterBottom>
                OXIARE GAS ENTERPRISES
              </Typography>
              <Button variant="contained" onClick={() => navigate('/purchase/quotation/' + props.orderId)}>
                VIEW QUOTE
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
};

export default Quote;
