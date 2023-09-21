import MainCard from "components/MainCard";
import { Box, Grid, Typography } from "@mui/material";

const About = () => {
    return (
        <MainCard>
            <Grid container spacing={4} sx={{ mt: 3, mb:3 }}>
                <Grid item xs={12} align="center">
                    <Typography variant="h1">ABOUT US</Typography>
                </Grid>
                <Grid item xs={12} lg={8} align="center" sx={{ textAlign: 'justify' }}>
                    <Typography variant="h6" sx={{ ml: 3 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla consectetur nibh id mi fringilla convallis. Curabitur sollicitudin neque nec sapien commodo, nec consequat lorem molestie. Curabitur vel tempor nisl. Quisque ut leo vel nulla condimentum tincidunt tincidunt vitae lectus. Vestibulum iaculis, turpis at efficitur vulputate, elit nibh elementum elit, in sollicitudin dui velit ut sapien. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In imperdiet laoreet nisi. In blandit maximus lorem nec cursus. Ut ultrices elit quis lorem rutrum, id dictum libero facilisis. Aenean quis fermentum ligula, at cursus felis. In sed dictum augue</Typography>
                    <Typography variant="h6" sx={{ ml: 3, mt: 2 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla consectetur nibh id mi fringilla convallis. Curabitur sollicitudin neque nec sapien commodo, nec consequat lorem molestie. Curabitur vel tempor nisl. Quisque ut leo vel nulla condimentum tincidunt tincidunt vitae lectus. Vestibulum iaculis, turpis at efficitur vulputate, elit nibh elementum elit, in sollicitudin dui velit ut sapien. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In imperdiet laoreet nisi. In blandit maximus lorem nec cursus. Ut ultrices elit quis lorem rutrum, id dictum libero facilisis. Aenean quis fermentum ligula, at cursus felis. In sed dictum augue</Typography>
                </Grid>
                <Grid item xs={12} lg={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Box component="img" src="https://placehold.co/400" alt="About Us" width={400} height={400} sx={{ mr: 3 }} />
                </Grid>
            </Grid>
        </MainCard>
    );
}

export default About;