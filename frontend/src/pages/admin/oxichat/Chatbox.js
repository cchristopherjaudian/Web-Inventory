import MainCard from 'components/MainCard';
import firebaseConfig from 'config/firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import { useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { Box, TextField, Button, Grid } from '@mui/material';
import { MessageOutlined } from '@ant-design/icons';
import Message from './Message';
let ref = null;
const Chatbox = (props) => {
  const myMobile = useSelector((state) => state.profile.contact.contact);
  const [firebaseApp] = useState(() => {
    if (!firebase.apps.length) {
      return firebase.initializeApp(firebaseConfig);
    } else {
      return firebase.app();
    }
  });
  const database = firebaseApp.database();

  const [input, setInput] = useState('');
  const [sendMessage, setSendMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    if (props.selectedChat) {
      ref = database.ref(props.selectedChat + 'messages/');
      const handleNewMessage = snapshot => {
        const data = snapshot.val();

        if (data) {
          console.log(data);
          setChatMessages(data);
        }
      };
      ref.on("value", handleNewMessage);
      return () => ref.off("value", handleNewMessage);
    }
  }, [props.selectedChat, database]);

  const handleSend = () => {

    setSendMessage(input);

  };
  const handleInputChange = (event) => {
    setInput(event.target.value);
  };
  useEffect(() => {
    if (sendMessage) {
      let newMessage = {
        content: sendMessage,
        time: new Date().toISOString(),
        src: myMobile
      }

      console.log(newMessage);
      ref.push(newMessage);
      setSendMessage('');
      setInput('');
    }
  }, [sendMessage])

  return (
    <Box
      sx={{
        height: '70vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'grey.100',
        mt: -2
      }}
    >
      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
        {
         
          Object.values(chatMessages).map((s, i) => {
            return <Message key={i} message={s.content} src={s.src} />;
          })
        }

      </Box>
      <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <TextField size="small" fullWidth placeholder="Type a message" variant="outlined" value={input} onChange={handleInputChange} />
          </Grid>
          <Grid item xs={2}>
            <Button fullWidth color="primary" variant="contained" endIcon={<MessageOutlined />} onClick={handleSend}>
              Send
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Chatbox;
