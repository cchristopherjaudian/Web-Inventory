import MainCard from "components/MainCard";
import { Box, Button, Card, CardContent, CardMedia, CardActionArea, CardActions, FormControl, InputLabel, Grid, Select, MenuItem, Typography, TextField } from "@mui/material";

const Shop = () => {
    const products = [
        { id: 1, name: 'flask type' },
        { id: 2, name: 'flask type' },
        { id: 3, name: 'flask type' },
        { id: 4, name: 'flask type' },
        { id: 5, name: 'flask type' },
        { id: 6, name: 'flask type' },
        { id: 7, name: 'flask type' }
    ]
    return (

        <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12}>
                <Box component="img" src="https://placehold.co/700x200" alt="Featured" sx={{ width: '100%', height: '200' }} />
            </Grid>

            <Grid item xs={12} sx={{ mt: 3 }}>
                <MainCard>
                    <form style={{ display: 'flex', alignItems: 'center' }}>
                        <TextField id="searchProduct" label="Search" variant="outlined" sx={{ width: '300px' }} />
                        <Select id="selectSort" sx={{ marginRight: '10px', marginLeft: '10px', width: '200px' }}>
                            <MenuItem value={10}>Option 1</MenuItem>
                            <MenuItem value={20}>Option 2</MenuItem>
                            <MenuItem value={30}>Option 3</MenuItem>
                        </Select>
                        <Button variant="contained" color="primary">
                            Search
                        </Button>
                    </form>
                </MainCard>
            </Grid>

            {
                products.map((product, index) => {
                    return (
                        <Grid item xs={3} key={index}>
                            <Card >
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        image="https://placehold.co/300"
                                        alt={product.name}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {product.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla consectetur nibh id mi fringilla convallis. Curabitur sollicitudin neque nec sapien commodo, nec consequat lorem molestie.
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        Share
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    )
                })
            }
        </Grid>
    );
}

export default Shop;