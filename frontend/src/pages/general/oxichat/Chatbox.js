import { useState } from 'react';
import { Box, TextField, Button, Grid } from '@mui/material';
import { MessageOutlined } from '@ant-design/icons';
import Message from './Message';

const messages = [
  { id: 1, text: 'Hi there!', sender: 'bot' },
  { id: 2, text: 'Hello!', sender: 'user' },
  { id: 3, text: 'How can I assist you today?', sender: 'bot' },
  { id: 4, text: 'How can I assist you today?', sender: 'bot' },
  { id: 5, text: 'How can I assist you today?', sender: 'bot' },
  { id: 6, text: 'How can I assist you today?', sender: 'bot' },
  { id: 7, text: 'How can I assist you today?', sender: 'bot' },
  { id: 8, text: 'How can I assist you today?', sender: 'bot' },
  { id: 9, text: 'How can I assist you today?', sender: 'bot' }
];
const Chatbox = () => {
  const [input, setInput] = useState('');
  const handleSend = () => {
    if (input.trim() !== '') {
      console.log(input);
      setInput('');
    }
  };
  const handleInputChange = (event) => {
    setInput(event.target.value);
  };
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
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
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
