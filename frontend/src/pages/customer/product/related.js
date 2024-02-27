import {  Button, Card, CardContent, CardMedia, CardActionArea, CardActions, Typography } from "@mui/material";


const RelatedProducts = (props) => {
  
    return (<Card >
        <CardActionArea>
            <CardMedia
                component="img"
                image="https://placehold.co/300"
                alt="test"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Test Product Name
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla consectetur nibh id mi fringilla convallis. Curabitur sollicitudin neque nec sapien commodo, nec consequat lorem molestie.
                </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions>
            <Button size="small" color="primary">
                Learn More
            </Button>
        </CardActions>
    </Card>);
}


export default RelatedProducts;