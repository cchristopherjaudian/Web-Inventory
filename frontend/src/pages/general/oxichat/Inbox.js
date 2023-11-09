import { Avatar, Card, CardActionArea, CardContent, Grid, Stack, Typography } from '@mui/material';

const Inbox = () => {
  return (
    <Grid item xs={12} sx={{ mt: 0.2 }}>
      <CardActionArea>
        <Card sx={{ display: 'flex', height: 60 }}>
          <CardContent sx={{ flex: 1, ml: -1, mt: -1 }}>
            <Stack direction="row" justifyContent="space-between">
              <Avatar />
              <Stack direction="column" justifyContent="space-between" sx={{ ml: -5 }}>
                <Typography component="caption" variant="caption" textAlign="left">
                  Admin
                </Typography>
                <Typography component="caption" variant="caption" textAlign="left">
                  Hello!Hello!Hello!Hello!Hello!Hello!Hello!
                </Typography>
              </Stack>
              <Stack direction="column">
                <Typography component="caption" variant="caption" textAlign="left">
                  00:00
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
