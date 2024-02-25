import { Button, Grid, TextField, Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
const Info = (props) => {
  const customerInfo = props.customerInfo;
  console.log(customerInfo);
  return (
    <Box sx={{ mt: 2 }}>
      <Grid container sx={{ px: 1.5, pb: 3 }}>
        <Grid item xs={12} md={6} sx={{ mt: 1 }}>
          <Typography variant="h3" sx={{ color: 'white', backgroundColor: '#3498db', ml: -2, mb: 2, pl: 2 }}>
            OXIAIRE
          </Typography>
          <Grid container sx={{ p: 3, backgroundColor: '#D1EAFF' }} spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="oxiOwner"
                fullWidth
                id="oxiOwner"
                label="Owner Name"
                value="Oxi Owner Name"
                disabled
                sx={{ backgroundColor: 'white' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="oxiCompany"
                fullWidth
                id="oxiCompany"
                label="Company Name"
                value="Oxiaure Gas Enterprises"
                disabled
                sx={{ backgroundColor: 'white' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="oxiAddress"
                value="1260 Maharlika Highway, Isabang, Lucena City"
                fullWidth
                id="oxiAddress"
                label="Address"
                disabled
                sx={{ backgroundColor: 'white' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="oxiPhone"
                value="042.710.2833 | 042.373.7077"
                fullWidth
                id="oxiPhone"
                label="Phone Number"
                disabled
                sx={{ backgroundColor: 'white' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="oxiEmail"
                value="oxiairegasenterprises@gmail.com"
                fullWidth
                id="oxiEmail"
                label="Email Address"
                disabled
                sx={{ backgroundColor: 'white' }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} sx={{ mt: 1 }}>
          <Typography variant="h3" sx={{ color: 'white', backgroundColor: '#3498db', ml: -2, pl: 2, mb: 2 }}>
            OXIAIRE
          </Typography>
          <Grid container sx={{ p: 3, backgroundColor: '#D1EAFF' }} spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="customerName"
                value={customerInfo.fullName}
                fullWidth
                id="customerName"
                disabled
                sx={{ backgroundColor: 'white' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="customerBusiness"
                value={customerInfo.businessName}
                fullWidth
                id="customerBusiness"
                disabled
                sx={{ backgroundColor: 'white' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="customerAddress"
                value={customerInfo.address}
                fullWidth
                id="customerAddress"
                disabled
                sx={{ backgroundColor: 'white' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="customerPhone"
                value={customerInfo.account?.username}
                disabled
                fullWidth
                id="customerPhone"
                sx={{ backgroundColor: 'white' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="customerEmail"
                value={customerInfo.emailAddress}
                fullWidth
                id="customerEmail"
                disabled
                sx={{ backgroundColor: 'white' }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Info;
