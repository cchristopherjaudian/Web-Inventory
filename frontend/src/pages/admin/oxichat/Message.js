import { Avatar, Box, Typography, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
const Message = (props) => {
  const myMobile = useSelector((state) => state.profile.contact.contact);
  const isBot = props.src !== myMobile;
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
        <Avatar sx={{ p: 2, bgcolor: isBot ? 'primary.main' : 'secondary.main' }}>{isBot ? 'U' : 'O'}</Avatar>
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            ml: isBot ? 0 : 1,
            mr: isBot ? 1 : 0,
            backgroundColor: isBot ? 'primary.light' : 'secondary.light',
            borderRadius: isBot ? '20px 20px 20px 5px' : '20px 20px 5px 20px'
          }}
        >
          {
            props.img === '' ? <Typography variant="body1">{props.message}</Typography>
              :
              <img src={props.img} width={250} height={250} alt={myMobile} />
          }
        </Paper>
      </Box>
    </Box>
  );
};

export default Message;
