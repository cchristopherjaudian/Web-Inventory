import firebaseConfig from 'config/firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import { useState, useEffect } from 'react';
import { Box, Grid, Typography, FormControl, InputAdornment, OutlinedInput } from '@mui/material';
import MainCard from 'components/MainCard';
import { SearchOutlined } from '@ant-design/icons';

import Inbox from './Inbox';
import Chatbox from './Chatbox';

const Oxichat = () => {
  let b2bList = [];
  let b2cList = [];
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  let ref = database.ref('/');
  const [selectedChat, setSelectedChat] = useState('');
  const [chatProfile, setChatProfile] = useState({});
  ref.on("value", snapshot => {
    const data = snapshot.val();

    data.B2C.recipients.map((s, i) => {
      b2cList.push({
        index: i,
        mobile: s.mobile,
        photoUrl: s.photoUrl,
        name: s.name
      })

    });
    data.B2B.recipients.map((s, i) => {
      b2bList.push({
        index: i,
        mobile: s.mobile,
        photoUrl: s.photoUrl,
        name: s.name
      })

    });
  });


  return (
    <Grid container spacing={0.5}>
      <Grid item xs={12}>
        <Typography variant="h4" color="#3498db">
          Oxichat
        </Typography>
      </Grid>
      <Grid item xs={12} lg={4} sx={{ height: '90vh' }}>
        <Grid direction="row" container spacing={0.5} sx={{ display: 'flex', height: '100%' }}>
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ mt: 1 }}>B2C</Typography>
            <Box
              sx={{
                height: '32vh',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
                {
                  b2cList.map((s, i) => {
                    return <Inbox key={i} profile={s} setSelectedChat={setSelectedChat} ctype="B2C" setChatProfile={setChatProfile} />
                  })
                }
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ mt: 1 }}>B2B</Typography>
            <Box
              sx={{
                height: '32vh',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
                {
                  b2bList.map((s, i) => {
                    return <Inbox key={i} profile={s} setSelectedChat={setSelectedChat} ctype="B2B" setChatProfile={setChatProfile} />
                  })
                }
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={8} style={{ height: '83vh' }}>
        <Grid direction="column" container style={{ display: 'flex', height: '100%' }}>
          <Grid item xs={12}>
            <MainCard title={chatProfile.name} sx={{ width: '100%' }}>
              <Chatbox selectedChat={selectedChat} chatProfile={chatProfile} />
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Oxichat;
