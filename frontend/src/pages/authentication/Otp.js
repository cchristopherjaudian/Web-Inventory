import { Avatar, Box, Button, CssBaseline, Grid, Paper, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const defaultTheme = createTheme();
const Otp = () => {

  const navigate = useNavigate();
  const [otp, setOtp] = useState('');

  const handleChange = (e) => {
    setOtp(e.target.value);
  }
  const verifyOtp = () =>{
    alert(otp);
  }
  return (<ThemeProvider theme={defaultTheme}>
    <Grid container component="main" sx={{ height: '100vh' }} >
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://placehold.co/600x400)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          flexDirection="column"
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          sx={{
            my: 8,
            mx: 4,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            {"Oxiaire Member's Portal"}
          </Typography>
          <Typography component="h1" variant="h6">
            Please enter the code send to your mobile number
          </Typography>
          <Grid container spacing={2} >
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <TextField
                sx={{ mt: 3 }}
                required
                id="otp"
                label="Verification Code"
                name="otp"
                inputProps={{ maxLength: 6 }}
                fullWidth
                autoFocus
                onChange={(e) => handleChange(e)}
              />
            </Grid>
          </Grid>
          <Button variant="contained" sx={{ mt: 3 }} fullWidth onClick={verifyOtp}>Verify</Button>
          <Button variant="outlined" sx={{ mt: 1 }} fullWidth onClick={() => navigate('/')}>Cancel</Button>
        </Box>
      </Grid>
    </Grid>
  </ThemeProvider>);


};

export default Otp;
