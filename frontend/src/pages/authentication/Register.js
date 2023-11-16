import { Link } from 'react-router-dom';
import { Grid, Stack, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import RegisterStepper from './RegisterStepper';

const defaultTheme = createTheme();
const Register = () => {
  const [selectedTab, setSelectedTab] = useState(0);
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
              Please select an account type below
            </Typography>
            <RegisterStepper selectedTab={selectedTab} />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Register;
