import MainCard from "components/MainCard";
import { Grid } from '@mui/material'
const Home = () => {
    return (<Grid container sx={{ height: '100%' }}>
        <Grid item xs={12} sx={{ flexGrow: 1 }}>
            <MainCard sx={{height: '100%'}}></MainCard>
        </Grid>
    </Grid>
    );
}

export default Home;