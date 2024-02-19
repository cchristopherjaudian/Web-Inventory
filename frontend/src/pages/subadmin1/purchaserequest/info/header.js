import { LoadingOutlined } from '@ant-design/icons';
import { Button, Grid, TextField, Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Header = (props) => {
  const navigate = useNavigate();
  const profile = useSelector((state) => state.profile);

  return (
    <Box>
      <Grid container spacing={1.5}>
        <Grid item xs={12} container justifyContent="flex-end">
          <Button variant="outlined" onClick={() => navigate("/pr")}>Back to Request List</Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h2" align="center">
            Purchase Request Form
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ mt: 3 }}>
          <Grid container spacing={1.5}>
            <Grid item xs={12} md={6}>
              <TextField name="name" fullWidth id="name" label="Name" value="placeholder d2" disabled />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="dateRequested"
                value="placeholder d2"
                disabled
                fullWidth
                id="dateRequested"
                label="Date Requested"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField name="phoneNumber" fullWidth id="phoneNumber" label="Phone Number" value="placeholder d2" disabled />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="dateRequired"
                value="placeholder d2"
                disabled
                fullWidth
                id="dateRequired"
                label="Date Required"
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 3 }}>
              <TextField name="email" fullWidth id="email" value="placeholder d2" label="Email Address" disabled />
            </Grid>
            <Grid item xs={12}>
              <TextField name="address" value="placeholder d2" fullWidth id="address" label="Address" disabled />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container spacing={1.5}></Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Header;
