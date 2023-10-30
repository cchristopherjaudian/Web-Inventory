import { Link, useLocation } from 'react-router-dom';
import { Avatar, CssBaseline,  Paper, Box, TextField, Grid, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FirebaseSocial from './auth-forms/FirebaseSocial';
import { styled } from '@mui/system';
import { useState, useEffect, forwardRef } from 'react';
import { useFormik } from 'formik';
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
  display: 'none',
});

export default function Login() {
  const location = useLocation();
  const [payload, setPayload] = useState({});
  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: values => {
      setPayload(values);
    },
  });
  useEffect(() => {
    setPayload(formik.values);
  }, [formik.values]);
  return (
    <ThemeProvider theme={defaultTheme}>
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
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
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
          <FirebaseSocial />
        </Grid>
        <Copyright sx={{ mt: 1 }} />
      </Grid >
    </ThemeProvider >
  );
}
