import { Avatar, Card, CardActionArea, CardContent, Grid, Stack, Typography } from '@mui/material';

const Inbox = (props) => {

  return (
    <Grid item xs={12} sx={{ mt: 0.2 }} onClick={() => {
      props.setSelectedChat(props.ctype + '/recipients/' + props.profile.mobile + '/chat/');
      props.setChatProfile(props.profile);
    }} >
      <CardActionArea>
        <Card sx={{ display: 'flex', height: 60 }}>
          <CardContent sx={{ flex: 1, ml: -1, mt: -1 }}>
            <Stack direction="row">
              <Avatar alt={props.profile.name} src={props.profile.photoUrl} />
              <Stack direction="column" sx={{ ml: 2 }}>
                <Typography component="caption" variant="caption" textAlign="left">
                  {props.profile.name}
                </Typography>
                <Typography component="caption" variant="caption" textAlign="left">
                  {props.profile.mobile}
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
};

export default Inbox;
