import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, CssBaseline, Paper, Box, TextField, Grid, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FirebaseSocial from './auth-forms/FirebaseSocial';
import { styled } from '@mui/system';
import { useState, useEffect, forwardRef } from 'react';
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
  setEmailAddress
} from 'store/reducers/profile';
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
  const { data, fetchData } = useAxios('accounts/login', 'POST', payload, true);
  const { profile, fetchProfile } = useAxiosBackup('profiles/auth', 'GET');
  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: (values) => {
      setPayload(values);
    }
  });
  useEffect(() => {
    setPayload(formik.values);
  }, [formik.values]);
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
        SUB_2: 2
      };
      const customerTypes = {
        CUSTOMER: 0,
        BUSINESS: 1
      };

      const newData = data['data']['newData'];
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
            backgroundImage: 'url(https://placehold.co/600x400)',
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
                    label="Username"
                    name="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    inputProps={{ maxLength: 11 }}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    type="password"
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
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
          </Box>
          {/* <FirebaseSocial /> */}
        </Grid>
        <Copyright sx={{ mt: 1 }} />
      </Grid>
    </ThemeProvider>
  );
}
