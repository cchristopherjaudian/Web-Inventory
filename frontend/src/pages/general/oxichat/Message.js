import { Avatar, Box, Typography, Paper } from '@mui/material';

const Message = (props) => {
  const isBot = props.message.sender === 'bot';
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isBot ? 'flex-start' : 'flex-end',
        mb: 2
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: isBot ? 'row' : 'row-reverse',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ bgcolor: isBot ? 'primary.main' : 'secondary.main' }}>{isBot ? 'B' : 'U'}</Avatar>
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            ml: isBot ? 1 : 0,
            mr: isBot ? 0 : 1,
            backgroundColor: isBot ? 'primary.light' : 'secondary.light',
            borderRadius: isBot ? '20px 20px 20px 5px' : '20px 20px 5px 20px'
          }}
        >
          <Typography variant="body1">{props.message.text}</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Message;
