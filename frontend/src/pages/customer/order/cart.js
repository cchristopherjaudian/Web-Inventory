import { Grid } from '@mui/material';
import CartItemList from "./CartItemList";
const Cart = ({ orderItems = [] }) => {
    return (
        <Grid container>
            <Grid item xs={12}>
                {
                    orderItems.length > 0 && orderItems?.map((s, i) => {
                        return <CartItemList key={i} product={s} />
                    })
                }
            </Grid>
        </Grid>
    );
}

export default Cart;