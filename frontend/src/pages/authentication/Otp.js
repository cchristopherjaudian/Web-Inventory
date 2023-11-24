import firebaseConfig from 'config/firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import axios from 'axios';

import { Avatar, Box, Button, CssBaseline, Grid, Paper, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import OtpInput from 'react-otp-input';
import Swal from 'sweetalert2';

const profileClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || '',
  timeout: 10000
});

const defaultTheme = createTheme();

if (firebase.apps?.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Otp = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const signUpData = JSON.parse(localStorage.getItem('signUpData'));
  const [payload, setPayload] = useState({});

  const onCaptchVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: (response) => {},
        'expired-callback': () => {}
      });
    }
  };

  const onSignUp = async () => {
    try {
      const appVerifier = window.recaptchaVerifier;
      const phoneNumber = signUpData.contact.replace('0', '+63');
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      window.confirmationResult = confirmationResult;
    } catch (error) {
      console.log('onSignUp error', error);
      Swal.fire({
        title: 'Account Verification',
        text: 'Failed to connect to authentication service. Please try again later',
        icon: 'error'
      });
    }
  };
  const onOTPVerify = async (e) => {
    e.preventDefault();
    try {
      const code = otp;
      if (!otp) return;
      const isConfirmed = await confirmationResult.confirm(code);
      const response = await profileClient.post('/profiles/full', payload);

      const buttonConfirmed = await Swal.fire({
        icon: 'success',
        title: 'Account Registration',
        text: 'Account registered successfully. Click OK to continue',
        allowOutsideClick: false,
        showCancelButton: false,
        confirmButtonText: 'Ok'
      });
      if (buttonConfirmed.isConfirmed) {
        navigate('/', { replace: true });
        return;
      }
    } catch (error) {
      console.log('onOTPVerify error', error);
      Swal.fire({
        title: 'Account Verification',
        text: 'Failed to connect to authentication service. Please try again later',
        icon: 'error'
      });
    }
  };

  useEffect(() => {
    if (!signUpData) return;

    const { account, contact, password, email: emailAddress, ...profile } = signUpData;

    setPayload(() => ({ account: { ...account, password, username: contact }, ...profile, emailAddress }));
  }, []);

  useEffect(() => {
    onCaptchVerify();
    onSignUp();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://i.ibb.co/850Hq0R/Login-Image.png)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
            backgroundSize: 'cover',
            backgroundPosition: 'center'
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
              mx: 4
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}></Avatar>
            <Typography component="h1" variant="h5">
              {"Oxiaire Member's Portal"}
            </Typography>
            <Typography component="h1" variant="body1">
              Please enter the code sent to your mobile number {signUpData.contact}
            </Typography>
            <div id="recaptcha-container"></div>
            <Grid container spacing={2}>
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
            <Button variant="contained" sx={{ mt: 3 }} fullWidth onClick={onOTPVerify}>
              Verify
            </Button>
            <Button variant="outlined" sx={{ mt: 1 }} fullWidth onClick={() => navigate('/')}>
              Cancel
            </Button>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Otp;
