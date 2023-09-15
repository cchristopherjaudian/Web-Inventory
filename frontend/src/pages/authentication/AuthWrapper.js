import PropTypes from 'prop-types';
import { Box, Grid } from '@mui/material';
import AuthCard from './AuthCard';
import AuthFooter from 'components/cards/AuthFooter';
import AuthBackground from 'assets/images/auth/AuthBackground';

const AuthWrapper = ({ children }) => (
  <Box sx={{ minHeight: '100vh' }}>
    <AuthBackground />
    <Grid
      container
      direction="column"
      justifyContent="flex-end"
      sx={{
        minHeight: '100vh'
      }}
    >
      <Grid item xs={12}>
        <Grid
          item
          xs={6}
          container
          direction="column"
        >
          <Grid item xs={6}>
            <img src='https://placehold.co/700x1200' alt='test' />
          </Grid>
          <Grid item>
            <AuthCard>{children}</AuthCard>
          </Grid>

        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
        <AuthFooter />
      </Grid>
    </Grid>
  </Box>
);

AuthWrapper.propTypes = {
  children: PropTypes.node
};

export default AuthWrapper;
