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
};

const Customers = (props) => {
  return (
    <Grid container spacing={0.5}>
      <Grid item xs={12}>
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
    </Grid>
  );
};

export default Customers;
