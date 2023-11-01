import {
    Grid
} from '@mui/material';
import HeadInfo from './headinfo';
import Cart from './cart';
const Order = () => {
    return (
        <Grid container spacing={1} sx={{ mt: 2 }}>
            <Grid item xs={12} lg={3}>
                <HeadInfo />
            </Grid>
            <Grid item xs={12} lg={9}>
                <Cart />
            </Grid>
        </Grid>
    );
}

export default Order;