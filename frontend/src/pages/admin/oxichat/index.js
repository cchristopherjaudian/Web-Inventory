import firebaseConfig from 'config/firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import { useState, useEffect } from 'react';
import { Avatar, Box, Grid, Typography } from '@mui/material';

import Inbox from './Inbox';
import Chatbox from './Chatbox';

const Oxichat = () => {
  const [firebaseApp] = useState(() => {
    if (!firebase.apps.length) {
      return firebase.initializeApp(firebaseConfig);
    } else {
      return firebase.app();
    }
  });
  const database = firebaseApp.database();
  const [render, setRender] = useState(false);
  const [cList, setCList] = useState([]);
  const [bList, setBList] = useState([]);
  const [selectedChat, setSelectedChat] = useState('');
  const [chatProfile, setChatProfile] = useState({});
  const [status, setStatus] = useState(false);
  let userStatusDatabaseRef = null;
  useEffect(() => {
    if (Object.keys(chatProfile).length > 0) {
      userStatusDatabaseRef = firebase.database().ref('/status/' + chatProfile.mobile);
      userStatusDatabaseRef.on('value', (snapshot) => {
        const isOnline = snapshot.val();
        setStatus(isOnline);
      });
    }
  }, [chatProfile]);

  useEffect(() => {
    setRender(true);
  }, [status]);

  useEffect(() => {
    let ref = database.ref('/');
    const handleNewData = (snapshot) => {
      const data = snapshot.val();
      let b2cList = [];
      let b2bList = [];
      if (data) {
        if (data.B2C) {
          Object.values(data.B2C.recipients).map((s, i) => {
            const userProfile = s.chat.messages[Object.keys(s.chat.messages).at(0)];
            b2cList.push({
              mobile: userProfile.mobile,
              photoUrl: userProfile.photoUrl,
              name: userProfile.name
            });
          });
        }
        if (data.B2B) {
          Object.values(data.B2B.recipients).map((s, i) => {
            const userProfile = s.chat.messages[Object.keys(s.chat.messages).at(0)];
            b2bList.push({
              mobile: userProfile.mobile,
              photoUrl: userProfile.photoUrl,
              name: userProfile.name
            });
          });
        }
      }

      setCList(b2cList);
      setBList(b2bList);
    };
    ref.on('value', handleNewData);
    return () => ref.off('value', handleNewData);
  }, [database]);

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
            <Typography sx={{ mt: 1 }}>B2C</Typography>
            <Box
              sx={{
                height: '32vh',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
                {cList.map((s, i) => {
                  return <Inbox key={i} profile={s} setSelectedChat={setSelectedChat} ctype="B2C" setChatProfile={setChatProfile} />;
                })}
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
                {bList.map((s, i) => {
                  return <Inbox key={i} profile={s} setSelectedChat={setSelectedChat} ctype="B2B" setChatProfile={setChatProfile} />;
                })}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      {render && (
        <Grid item xs={12} lg={8} style={{ height: '83vh' }}>
          <Grid direction="column" container style={{ display: 'flex', height: '100%' }}>
            <Grid item xs={12} sx={{ width: '100%' }}>
              {selectedChat && (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                  <Avatar sx={{ width: 24, height: 24, bgcolor: status ? '#2ecc71' : '#2c3e50', mr: 1 }} />
                  <Typography variant="body1">{chatProfile.name}</Typography>
                </Box>
              )}
              {selectedChat && <Chatbox selectedChat={selectedChat} chatProfile={chatProfile} />}
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default Oxichat;
