import { Grid } from '@mui/material';
import CartItemList from "./CartItemList";
import Payment from './payment';
const Checkout = ({ order = {} }) => {
    return (<Grid container>
        <Grid item xs={12} md={4}>
            <Payment order={order}/>
        </Grid>
        <Grid item xs={12} md={8}>
            {
                order.orderItems.length > 0 && order.orderItems?.map((s, i) => {
                    return <CartItemList key={i} product={s} />
                })
            }
        </Grid>
    </Grid>);
}

export default Checkout;