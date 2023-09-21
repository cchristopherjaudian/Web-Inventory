import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MainCard from 'components/MainCard';
import Grid from '@mui/material/Grid';
import { FormControl, InputAdornment, OutlinedInput } from '@mui/material';
import { SearchOutlined } from '@ant-design/icons';
import CustomerTable from './CustomerTable';

const handleSubmit = (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  console.log({
    email: data.get('email'),
    password: data.get('password'),
  });
};

const Customers = (props) => {
  
  return (
    <Grid container spacing={0.5}>
      <Grid item xs={12} md={8} >
        <Grid direction="row" container spacing={0.5} sx={{ display: 'flex', height: '100%' }}>

          <Grid item xs={12} style={{ display: 'flex', flex: 1 }}>
            <MainCard sx={{ width: '100%', flexGrow: 1 }}>
              <FormControl sx={{ width: { xs: '100%' } }}>
                <OutlinedInput
                  size="small"
                  id="header-search"
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchOutlined />
                    </InputAdornment>
                  }
                  aria-describedby="header-search-text"
                  inputProps={{
                    'aria-label': 'weight'
                  }}
                  placeholder="Search"
                />
              </FormControl>
              <CustomerTable type={props.type} />
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={4}>
        <Grid direction="column" container >
          <Grid item xs={12} style={{ display: 'flex', flex: 1 }}>
            <MainCard title="Account Details" sx={{ width: '100%' }}>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: -3, height: '100%' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      name="firstname"
                      required
                      fullWidth
                      id="firstname"
                      label="First Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      name="middlename"
                      required
                      fullWidth
                      id="middlename"
                      label="Middle Name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      fullWidth
                      id="lastname"
                      label="Last Name"
                      name="lastname"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="address"
                      label="Address"
                      name="address"
                      autoComplete="address"
                    />
                  </Grid>

                </Grid>

              </Box>
              <Box sx={{ mb: 2, mt: 2 }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                >
                  Update
                </Button>
              </Box>

            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
};

export default Customers;
