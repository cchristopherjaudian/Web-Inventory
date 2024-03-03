import MainCard from 'components/MainCard';
import { Stack, Button, Grid, TextField, FormControlLabel, Checkbox, Box } from '@mui/material';
import { SearchOutlined } from '@ant-design/icons';

const CustomerInfo = (props) => {
  return (
    <MainCard title="Transaction Records">
      <Box>
        <Grid container spacing={1.5}>
          <Grid item xs={12} md={3}>
            <TextField name="lastName" fullWidth id="lastName" label="Last Name" autoFocus />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField name="firstName" fullWidth id="firstName" label="First Name" />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField name="middleName" fullWidth id="middleName" label="Middle Name" />
          </Grid>

          <Grid item xs={12} md={3}>
            <Stack direction="row" justifyContent="end" spacing={1}>
              <Button variant="contained" onClick={() => props.retrieveTransactions()} startIcon={<SearchOutlined />}>
                Load Records
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </MainCard>
  );
};

export default CustomerInfo;
