import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Box, TextField, Button, Grid } from '@mui/material';
import { PaperClipOutlined, LoadingOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import Message from './Message';
import firebaseConfig from 'config/firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import PaymentReminder from './PaymentReminder';
let messageRef = null;
const Chatbox = () => {
  const [attachLoading, setAttachLoading] = useState(false);
  const [file, setFile] = useState(null);
  const isBusiness = useSelector((state) => state.token.customertype.customertype);
  const myMobile = useSelector((state) => state.profile.contact.contact);
  const fn = useSelector((state) => state.profile.firstName.firstName);
  const ln = useSelector((state) => state.profile.lastName.lastName);
  const myName = fn + ' ' + ln;
  const customerType = isBusiness === 0 ? 'B2C' : 'B2B';
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
      messageRef = database.ref(customerType + '/recipients/' + myMobile + '/chat/messages/');
      const handleNewMessage = (snapshot) => {
        const data = snapshot.val();

        if (data) {
          setChatMessages(data);
        }
      };
      messageRef.on('value', handleNewMessage);
      return () => messageRef.off('value', handleNewMessage);
    }
  }, [database]);

  const handleSend = () => {
    setSendMessage(input);
  };
  const handleImageChange = (e) => {
    let file = e.target.files[0];
    if (file.size >= 2 * 1024 * 1024) {
      Swal.fire({
        title: 'Image Attachment',
        text: 'File size must be 2mb or less',
        icon: 'error'
      });
      return;
    }
    setFile(e.target.files[0]);
  };
  useEffect(() => {
    if (file) {

      setAttachLoading(true);
      const storage = getStorage();
      const storageRef = ref(storage, 'chat/' + myMobile + Date.now() + '.jpg');
      uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((downloadURL) => {
            let newMessage = {
              content: '',
              img: downloadURL,
              time: new Date().toISOString(),
              src: myMobile,
              mobile: myMobile,
              name: myName,
              photoUrl: 'https://placehold.co/100'
            };
            messageRef.push(newMessage);
            setSendMessage('');
            setInput('');
            setFile(null);
            setAttachLoading(false);
          });
      });
    }
  }, [file])

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };
  useEffect(() => {
    if (sendMessage) {
      let newMessage = {
        content: sendMessage,
        img: '',
        time: new Date().toISOString(),
        src: myMobile,
        mobile: myMobile,
        name: myName,
        photoUrl: 'https://placehold.co/100'
      };

      messageRef.push(newMessage);
      setSendMessage('');
      setInput('');
    }
  }, [sendMessage]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [chatMessages]);
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
        {Object.values(chatMessages).map((s, i) => {
          return Object.prototype.hasOwnProperty.call(s, 'html') ? 
            <PaymentReminder key={i} html={s.html} src={s.src} img={s.img}/>
            :
            <Message key={i} message={s.content} src={s.src} img={s.img} />;
        })}
        <div ref={messagesEndRef} />
      </Box>
      <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            size="small"
            fullWidth
            placeholder="Type a message"
            variant="outlined"
            value={input}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSend();
              }
            }}
            sx={{ flexGrow: 1 }}
          />

          <Box>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="contained-button-file"
              type="file"
              onChange={handleImageChange}
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" fullWidth component="span" endIcon={attachLoading ? <LoadingOutlined /> : <PaperClipOutlined />}>Attach</Button>
            </label>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Chatbox;
