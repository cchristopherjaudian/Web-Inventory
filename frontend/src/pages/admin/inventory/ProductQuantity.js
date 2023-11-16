import { Card, CardActionArea, CardContent, CardMedia, Chip, Grid, Stack, Typography } from '@mui/material';

const ProductQuantity = (props) => {
  return (
    <Grid item xs={6}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex', height: 95 }}>
          <CardMedia
            component="img"
            sx={{ width: 100, height: 100, display: { xs: 'none', sm: 'block' } }}
            image={props.stock.photoUrl ? props.stock.photoUrl : 'https://placehold.co/100'}
            alt={props.stock?.code}
          />
          <CardContent sx={{ flex: 1, ml: -1, mt: -1 }}>
            <Stack direction="column" justifyContent="center">
              <Typography component="caption" variant="caption" textAlign="left" sx={{ lineHeight: 2 }}>
                {props.stock?.name.substring(0, 30)}
                {props.stock?.name.length > 30 && '.....'}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1, fontSize: '0.6rem' }}>
                Remaining Qty: {props.stock?.quantity}
              </Typography>
              {props.stock?.indicator === 'LOW' ? (
                <Chip label="Low" color="error" variant="outlined" size="small" sx={{ mt: 1 }} />
              ) : (
                <Chip label="High" color="success" variant="outlined" size="small" sx={{ mt: 1 }} />
              )}
            </Stack>
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
};

export default ProductQuantity;
