import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, TextField, Button, Grid } from '@mui/material';
import { MessageOutlined } from '@ant-design/icons';
import Message from './Message';
import firebaseConfig from 'config/firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

let messageRef = null;
const Chatbox = () => {
  const isBusiness = useSelector((state) => state.token.customertype.customertype);
  const myMobile = useSelector((state) => state.profile.contact.contact);
  const fn = useSelector((state) => state.profile.firstName.firstName);
  const ln = useSelector((state) => state.profile.lastName.lastName);
  const myName = fn + ' ' + ln;
  const customerType = (isBusiness === 0) ? 'B2C' : 'B2B';
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
    if (database) {
      console.log(myMobile);
      messageRef = database.ref(customerType + '/recipients/' + myMobile + '/chat/messages/');
      console.log(messageRef);
      const handleNewMessage = snapshot => {
        const data = snapshot.val();

        if (data) {
          setChatMessages(data);
        }
      };
      messageRef.on("value", handleNewMessage);
      return () => messageRef.off("value", handleNewMessage);
    }
  }, [database]);
 
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
        src: myMobile,
        mobile: myMobile,
        name: myName,
        photoUrl: 'https://placehold.co/100'
      }

      messageRef.push(newMessage);
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
            <TextField size="small" fullWidth placeholder="Type a message" variant="outlined" value={input} onChange={handleInputChange} onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSend();
              }
            }} />
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
