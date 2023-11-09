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
import Swal from 'sweetalert2';

import { useDispatch, useSelector } from 'react-redux';
import { setToken } from 'store/reducers/token';

import useAxios from 'hooks/useAxios';
import useMetricsAxios from 'hooks/useMetricsAxios';

const defaultTheme = createTheme();
const Otp = () => {
  firebase.initializeApp(firebaseConfig);
  const auth = getAuth();
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const signUpData = JSON.parse(localStorage.getItem('signUpData'));
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.token);
  const [temporaryToken, setTemporaryToken] = useState('');
  const [payload, setPayload] = useState({});
  const [patchProfile, setPatchProfile] = useState({});
  const [registerProfile, setRegisterProfile] = useState({});
  const { data, error, fetchData } = useAxios('accounts', 'POST', registerProfile);
  const { metricsData, metricsError, metricsFetchData } = useMetricsAxios('profiles', 'POST', patchProfile, true, temporaryToken);

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
    const phoneNumber = signUpData.contact.replace('0', '+63');
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;

      }).catch((error) => {
        Swal.fire({
          title: 'Account Verification',
          text: 'Failed to connect to authentication service. Please try again later',
          icon: 'error'
        })
      });
  }
  function onOTPVerify() {
    const code = otp;
    if(!otp) return;
    confirmationResult.confirm(code).then((result) => {
      setPayload(signUpData);
    }).catch((error) => {
      Swal.fire({
        title: 'Account Verification',
        text: 'Failed to connect to authentication service. Please try again later',
        icon: 'error'
      })
    });

  }
  useEffect(() => {
    onSignUp();
  }, [])
  useEffect(() => {
    if (error && Object.keys(payload).length !== 0) {
      let msg = '';
      if (error['response']['status'] === 400) {
        msg = ('Failed to register account. Please validate all fields.')
      } else {
        msg = ('Failed to communicate with server. Please try again.')
      }

      Swal.fire(
        'Account',
        msg,
        'warning'
      );
    }
  }, [error]);
  useEffect(() => {
    if (metricsError) {
      console.log(metricsError);
      Swal.fire(
        'Account Registration',
        metricsError,
        'error'
      );
    }
  }, [metricsError])
  useEffect(() => {

    if (payload && Object.keys(payload).length > 0) {
      console.log('setPayload');
      console.log(payload);
      const registerPayload = {
        username: payload['contact'],
        password: payload['password'],
        accountType: payload['account']['accountType'],
      };
      const patchPayload = {
        firstname: payload['firstname'],
        middlename: payload['middlename'],
        lastname: payload['lastname'],
        address: payload['address'],
        emailAddress: payload['email'],
      }
      if (payload['account']['accountType'] === 'BUSINESS') {
        patchPayload.businessName = payload['businessName'];
      }
      console.log(patchPayload);
      setRegisterProfile(registerPayload);
      setPatchProfile(patchPayload);
    }

  }, [payload]);
  useEffect(() => {
    if (registerProfile && Object.keys(registerProfile).length > 0) {
      console.log('registerProfile');
      fetchData();
    }
  }, [registerProfile]);
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      console.log('if Data');
      console.log(data['data']['token']);
      if (data.status === 200) {
        const newToken = data['data']['token'];
        setTemporaryToken(newToken);
        dispatch(setToken({ token: newToken }));
      }
    }
  }, [data]);
  useEffect(() => {
    if (temporaryToken) {
      console.log('temp Token');
      console.log(temporaryToken);
      metricsFetchData();
    }
  }, [temporaryToken]);
  useEffect(() => {
    if (metricsData && Object.keys(metricsData).length > 0) {
      console.log('metricsData');
      if (metricsData['status'] === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Account Registration',
          text: 'Account registered successfully. Click OK to continue',
          allowOutsideClick: false,
          showCancelButton: false,
          confirmButtonText: 'Ok'
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/', { replace: true })
          }
        })
      }
    }
  }, [metricsData]);
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
