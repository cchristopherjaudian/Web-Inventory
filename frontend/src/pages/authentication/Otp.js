import firebaseConfig from 'config/firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { Avatar, Box, Button, CssBaseline, Grid, Paper, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import OtpInput from 'react-otp-input';
const defaultTheme = createTheme();
const Otp = () => {
  firebase.initializeApp(firebaseConfig);
  const auth = getAuth();
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const signUpData = JSON.parse(localStorage.getItem('signUpData'));
  console.log(signUpData);
  //localStorage.removeItem('signUpData');
  function onCaptchVerify() {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {

      },
      'expired-callback': () => {

      }
    });
  }
  function onSignUp() {
    onCaptchVerify();
    const appVerifier = window.recaptchaVerifier;
    const phoneNumber = signUpData.contact.replace('0','+63');
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        console.log(confirmationResult);
        window.confirmationResult = confirmationResult;

      }).catch((error) => {
        console.log(error);
      });
  }
  function onOTPVerify() {
    const code = otp;
    confirmationResult.confirm(code).then((result) => {
      const user = result.user;
      console.log(user);
    }).catch((error) => {
      console.log(error);
    });
  }
  useEffect(()=>{
    onSignUp();
  },[])
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
          <Typography component="h1" variant="body1">
            Please enter the code send to your mobile number {signUpData.contact}
          </Typography>
          <div id='recaptcha-container'></div>
          <Grid container spacing={2} >
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span>-</span>}
                inputStyle={{ width: '2rem', height: '2rem' }}
                renderInput={(props) => <input {...props} />}
              />

            </Grid>
          </Grid>
          <Button variant="contained" sx={{ mt: 3 }} fullWidth onClick={onOTPVerify}>Verify</Button>
          <Button variant="outlined" sx={{ mt: 1 }} fullWidth onClick={() => navigate('/')}>Cancel</Button>
        </Box>
      </Grid>
    </Grid>
  </ThemeProvider>);


};

export default Otp;
