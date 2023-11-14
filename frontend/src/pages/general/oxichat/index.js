import { Box, Grid, Typography, FormControl, InputAdornment, OutlinedInput } from '@mui/material';
import MainCard from 'components/MainCard';
import { SearchOutlined } from '@ant-design/icons';

import Inbox from './Inbox';
import Chatbox from './Chatbox';

const Oxichat = () => (
  <Grid container spacing={0.5}>
    <Grid item xs={12} style={{ marginTop: '30px' }}>
      <Typography variant="h4" color="#3498db">
        Oxichat
      </Typography>
    </Grid>
    
    <Grid item xs={12}>
      <Grid direction="column" container style={{ display: 'flex', height: '100%' }}>
        <Grid item xs={12}>
          <MainCard title="Admin" sx={{ width: '100%' }}>
            <Chatbox />
          </MainCard>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

export default Oxichat;
