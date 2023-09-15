import PropTypes from 'prop-types';

import { Box, Grid, Stack, Typography } from '@mui/material';

import MainCard from 'components/MainCard';

const Analytics = ({ color, title, count, extra }) => (
  <MainCard contentSX={{ p: 2.25 }}>
    <Stack spacing={0.5}>
      <Typography variant="h6" color={color}>
        {title}
      </Typography>
      <Grid container alignItems="center">
        <Grid item>
          <Typography variant="h5" color="inherit">
            {count}
          </Typography>
        </Grid>
      </Grid>
    </Stack>
    <Box sx={{ pt: -1.25 }}>
      <Typography variant="caption" color="textSecondary">
        {extra}
      </Typography>
    </Box>
  </MainCard>
);

Analytics.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.string,
  extra: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};

Analytics.defaultProps = {
  color: 'primary'
};

export default Analytics;
