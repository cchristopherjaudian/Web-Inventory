import { Card, CardActionArea, CardContent, Grid, Stack, Typography } from '@mui/material';

const Data = (props) => {
  return (
    <Grid item xs={6} sx={{ mt: 0.5 }}>
      <CardActionArea>
        <Card sx={{ backgroundColor: props.background ? props.background : 'white' }}>
          <CardContent sx={{ flex: 1, ml: -1, mt: -1 }}>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={5}>
              <Typography component="h6" variant="h6" textAlign="center" sx={{ color: props.color ? props.color : 'black' }}>
                {props.title}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
};

export default Data;
