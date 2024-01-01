import firebaseConfig from 'config/firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { Avatar, Box, Button, CssBaseline, Grid, Paper, TextField, Typography, InputAdornment, IconButton } from '@mui/material';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import OtpInput from 'react-otp-input';
import Swal from 'sweetalert2';

import useAxios from 'hooks/useAxios';

firebase.initializeApp(firebaseConfig);

const defaultTheme = createTheme();
const Forgot = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [isSent, setIsSent] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [otp, setOtp] = useState('');
  const [payload, setPayload] = useState({});
  const { data, error, fetchData } = useAxios('accounts/forgot-password', 'PATCH', payload);
  const [mobileNumber, setMobileNumber] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = (field = '') => {
    if (field === 'new') {
      setShowNewPassword(!showNewPassword);
      return;
    }

    setShowConfirmPassword(!showConfirmPassword);
  };

  function onOTPVerify() {
    const code = otp;
    if (!otp) return;
    confirmationResult
      .confirm(code)
      .then((result) => {
        setIsVerified(true);
      })
      .catch((error) => {
        Swal.fire({
          title: 'Account Verification',
          text: 'Failed to connect to authentication service. Please try again later',
          icon: 'error'
        });
      });
  }
  function onSignUp() {
    if (!mobileNumber) return;
    setIsWaiting(true);
    onCaptchVerify();
    const appVerifier = window.recaptchaVerifier;
    const phoneNumber = mobileNumber.replace('0', '+63');
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        console.log('error', error);
        Swal.fire({
          title: 'Account Verification',
          text: 'Failed to connect to authentication service. Please try again later',
          icon: 'error'
        });
      });
  }
  function onCaptchVerify() {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
      callback: (response) => {},
      'expired-callback': () => {}
    });
  }
  function processChange() {
    if (newPassword !== confirmPassword) {
      Swal.fire({
        title: 'Change Password',
        text: 'New Password and Confirmed Password are not equal',
        icon: 'info'
      });
      return;
    }
    if (newPassword === '') {
      Swal.fire({
        title: 'Change Password',
        text: 'Please input a valid password',
        icon: 'info'
      });
      return;
    }
    setPayload({
      username: mobileNumber,
      password: newPassword
    });
  }
  useEffect(() => {
    if (Object.keys(payload).length > 0) {
      fetchData();
    }
  }, [payload]);
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      if (data['status'] === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Change Password',
          text: 'Password updated successfully. Click OK to continue',
          allowOutsideClick: false,
          showCancelButton: false,
          confirmButtonText: 'Ok'
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/', { replace: true });
          }
        });
      } else {
        Swal.fire({
          title: 'Change Password',
          text: 'Failed to update password. Please try again.',
          icon: 'error'
        });
      }
    }
  }, [data]);
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
            <div id="recaptcha-container"></div>
            {isVerified ? (
              <>
                <Typography component="h1" variant="body1">
                  Please enter your new password
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="password"
                      label="New Password"
                      name="password"
                      type={showNewPassword ? 'text' : 'password'}
                      inputProps={{ maxLength: 15 }}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      autoFocus
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => handleClickShowPassword('new')}
                              edge="end"
                              size="large"
                            >
                              {showNewPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="cpassword"
                      label="Confirm New Password"
                      name="cpassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      inputProps={{ maxLength: 15 }}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => handleClickShowPassword('confirm')}
                              edge="end"
                              size="large"
                            >
                              {showConfirmPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                </Grid>
                <Button variant="contained" sx={{ mt: 3 }} fullWidth onClick={processChange}>
                  Update Password
                </Button>
                <Button variant="outlined" sx={{ mt: 1 }} fullWidth onClick={() => navigate('/')}>
                  Cancel
                </Button>
              </>
            ) : isWaiting ? (
              <>
                <Typography component="h1" variant="body1">
                  Please enter the code sent to your mobile number
                </Typography>

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
              </>
            ) : (
              <>
                <Typography comonent="h1" variant="body1" sx={{ mt: 2 }}>
                  Please enter your mobile number
                </Typography>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="username"
                      label="Phone Number"
                      name="username"
                      inputProps={{ maxLength: 13 }}
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                </Grid>
                <Button variant="contained" sx={{ mt: 3 }} fullWidth onClick={onSignUp}>
                  Send OTP
                </Button>
                <Button variant="outlined" sx={{ mt: 1 }} fullWidth onClick={() => navigate('/')}>
                  Cancel
                </Button>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Forgot;
