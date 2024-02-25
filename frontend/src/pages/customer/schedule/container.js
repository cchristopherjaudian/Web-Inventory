import { Grid } from '@mui/material';
import Data from './data';
const Container = () => {
  return (
    <Grid container spacing={0.5} sx={{ mt: 1 }}>
      <Grid xs={12} lg={3} direction="column">
        <Data title="Eyyy" />
        <Data title="Eyyy" />
        <Data title="Eyyy" />
        <Data title="Eyyy" />
      </Grid>
      <Grid xs={12} lg={3} direction="column">
        <Data title="Eyyy" />
        <Data title="Eyyy" />
        <Data title="Eyyy" />
      </Grid>
      <Grid xs={12} lg={3} direction="column">
        <Data title="Eyyy" />
      </Grid>
      <Grid xs={12} lg={3} direction="column">
        <Data title="Eyyy" />
        <Data title="Eyyy" />
      </Grid>
    </Grid>
  );
};

export default Container;
