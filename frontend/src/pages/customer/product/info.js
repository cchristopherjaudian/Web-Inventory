import { IconButton, Button, Box, Chip, Typography, Card, CardMedia, CardContent, Grid } from '@mui/material';
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons';

const Info = (props) => {
    return (<Card sx={{ width: '100%', display: 'flex' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardMedia
                component="img"
                height="300"
                image={"https://placehold.co/300"}
                alt="placeholder"
            />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Typography gutterBottom variant="h4">
                        {props.itemInfo.name}
                    </Typography>
                    <Chip label=" 50 lbs" color="error" size="small" />
                </Box>
                <Typography variant="body2" color="text.secondary">
                    200 stocks available
                </Typography>
                <Typography mt={3} variant="body1" color="#2980b9">
                    Price: {props.itemInfo.price}
                </Typography>
                <Grid container spacing={0.2} mt={2}>
                    <Grid item xs={6}>
                        <Typography variant="body2" >
                            Availability
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body2" color="#2980b9">
                            In Stock
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body2" >
                            Category
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body2" color="#2980b9">
                            Medical Oxygen
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body2" >
                            Walk in | Deliver
                        </Typography>
                    </Grid>
                    <Grid item xs={12} mt={4}>
                        {
                            props.cartItems.some(obj => obj.id === id) ?
                                <Button variant="contained" color="success" startIcon={<ShoppingCartOutlined />}>
                                    Added
                                </Button>
                                :
                                <Button variant="contained" startIcon={<ShoppingCartOutlined />} onClick={() => props.setCartItem(props.itemInfo)}>
                                    Add to Cart
                                </Button>
                        }

                        <IconButton variant="contained">
                            <HeartOutlined />
                        </IconButton>
                    </Grid>
                </Grid>

            </CardContent>
        </Box>

    </Card>);
}

export default Info; 