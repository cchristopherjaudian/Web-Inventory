import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { Avatar, Button, CssBaseline, Paper, Box, TextField, Grid, Typography, InputAdornment, IconButton } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import useAxios from 'hooks/useAxios';
import useAxiosBackup from 'hooks/useAxiosBackup';
import { setCart } from 'store/reducers/cart';
import { setToken, setAuth, setAdmin, setAdminType, setCustomerType } from 'store/reducers/token';

import {
  setBusinessName,
  setContact,
  setFirstName,
  setMiddleName,
  setLastName,
  setAddress,
  setAccType,
  setEmailAddress,
  setPhotoUrl
} from 'store/reducers/profile';
import Swal from 'sweetalert2';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Oxiaire
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();
const Input = styled('input')({
  display: 'none'
});

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [newToken, setNewToken] = useState('');
  const [newData, setNewData] = useState(false);
  const [payload, setPayload] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const { data, error, fetchData } = useAxios('accounts/login', 'POST', payload, true);
  const { profile, fetchProfile } = useAxiosBackup('profiles/auth', 'GET');
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: (values) => {
      const newValues = { ...values, username: values.username.replace('+63', '0') };
      setPayload(newValues);
    }
  });
  useEffect(() => {
    const newValues = { ...formik.values, username: formik.values.username.replace('+63', '0') };
    setPayload(newValues);
  }, [formik.values]);
  useEffect(() => {
    if (error) {
      Swal.fire({
        title: "Member's Portal",
        text: 'Invalid mobile number or password. Please try again',
        icon: 'error'
      });
    }
  }, [error]);
  useEffect(() => {
    if (data) {
      if (data['status'] === 200) {
        const createToken = data['data']['token'];
        dispatch(setToken({ token: createToken }));
        setNewData(data['data']['newData']);
        setNewToken(createToken);
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Login',
          text: 'Invalid username/password. Please try again.',
          showCancelButton: false,
          confirmButtonText: 'Ok'
        });
      }
    }
  }, [data]);
  useEffect(() => {
    if (newToken) {
      fetchProfile();
    }
  }, [newToken]);
  useEffect(() => {
    if (profile) {
      dispatch(setCart([]));
      const adminTypes = {
        ADMIN: 0,
        SUB_1: 1,
        SUB_2: 2,
        WH: 3,
        LOGI: 4
      };
      const customerTypes = {
        CUSTOMER: 0,
        BUSINESS: 1
      };

      const accountType = profile['data']['account']['accountType'];

      dispatch(setAuth({ authenticated: true }));
      dispatch(setAccType({ accType: accountType }));
      dispatch(setContact({ contact: payload['username'] }));
      dispatch(setEmailAddress({ emailAddress: profile['data']['emailAddress'] }));
      dispatch(setFirstName({ firstName: profile['data']['firstname'] }));
      dispatch(setMiddleName({ middleName: profile['data']['middlename'] }));
      dispatch(setLastName({ lastName: profile['data']['lastname'] }));
      dispatch(setAddress({ address: profile['data']['address'] }));
      dispatch(setBusinessName({ businessName: profile['data']['businessName'] }));
      dispatch(setPhotoUrl({ photoUrl: profile['data']['photoUrl'] }));
      if (accountType in adminTypes) {
        dispatch(setAdminType({ adminType: adminTypes[accountType] }));
        dispatch(setAdmin({ isadmin: true }));
        navigate('/', { replace: true });
      } else {
        const customerType = profile['data']['account']['accountType'];
        dispatch(setCustomerType({ customertype: customerTypes[customerType] }));
        dispatch(setAdmin({ isadmin: false }));
        navigate('/home', { replace: true });
      }
    }
  }, [profile]);
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
            backgroundImage: 'url(asset/login-left.png)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <Grid container sx={{ height: '100%' }}>
            <Grid
              item
              xs={12}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 4,
                mt: 2
              }}
            >
              <Typography
                variant="h3"
                component="div"
                sx={{ color: '#2980b9', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                gutterBottom
              >
                QUALITY and SAFETY
              </Typography>
              <Typography
                variant="h3"
                component="div"
                sx={{ color: '#16a085', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                gutterBottom
              >
                OUR PRIORITY
              </Typography>
            </Grid>
          </Grid>
        </Grid>
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
            <Typography component="h1" variant="body2">
              Please sign-in with your account to continue
            </Typography>
            <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 2, height: '100%' }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="Phone Number"
                    name="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    inputProps={{ maxLength: 13 }}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end" size="large">
                            {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" fullWidth onClick={() => fetchData()}>
                    Login
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Typography component="h1" variant="body2">
                Don&apos;t have an account yet?
              </Typography>
              <Typography component={Link} to="register" variant="body2">
                Sign Up
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Typography component={Link} to="forgot" variant="body2">
                Forgot Password
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <img
                style={{ borderRadius: '20px', maxWidth: '100%' }}
                src="https://i.ibb.co/SXwBMQ8/homepage-image.png"
                alt="bottom"
                width={600}
                height={600}
              />
            </Box>
          </Box>
        </Grid>
        <Copyright sx={{ mt: 1 }} />
      </Grid>
    </ThemeProvider>
  );
}
