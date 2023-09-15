import { Box, Grid, Typography, FormControl, InputAdornment, OutlinedInput } from '@mui/material';
import MainCard from 'components/MainCard';
import { SearchOutlined } from '@ant-design/icons';

import Inbox from './Inbox';
import Chatbox from './Chatbox';

const Oxichat = () => (
  <Grid container spacing={0.5}>
    <Grid item xs={12}>
      <Typography variant="h4" color="#3498db">
        Oxichat
      </Typography>
    </Grid>
    <Grid item xs={12} lg={4} sx={{ height: '84vh' }}>
      <Grid direction="column" container spacing={0.5} sx={{ display: 'flex', height: '100%' }}>
        <MainCard sx={{ mt: 0.6 }}>
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
        </MainCard>
        <Typography sx={{ mt: 1 }}>B2C</Typography>
        <Box
          sx={{
            height: "32vh",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
            <Inbox />
            <Inbox />
            <Inbox />
            <Inbox />
          </Box>
        </Box>
        <Typography sx={{ mt: 1 }}>B2B</Typography>
        <Box
          sx={{
            height: "32vh",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
            <Inbox />
            <Inbox />
            <Inbox />
            <Inbox />
          </Box>
        </Box>

      </Grid>
    </Grid>
    <Grid item xs={12} lg={8} style={{ height: '83vh' }}>
      <Grid direction="column" container style={{ display: 'flex', height: '100%' }}>
        <Grid item xs={12} style={{ display: 'flex', flex: 1 }}>
          <MainCard title="Ricardo Madlangtuta Jr." sx={{ width: '100%' }}>
            <Chatbox />
          </MainCard>

        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

export default Oxichat;
