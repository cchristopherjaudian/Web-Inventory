import MainCard from "components/MainCard";
import { Button, Divider, Grid, Typography } from '@mui/material';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
const Price = (props) => {
    const cartItems = useSelector((state) => state.cart.cart);
    const [subtotal, setSubTotal] = useState(0);
    console.log(cartItems);

    useEffect(() => {
        if (cartItems) {
            const totalPrice = cartItems.reduce((total, item) => total + Number(item.cartItem.price) * item.quantity, 0);
            setSubTotal(totalPrice);
        }
    }, [cartItems]);
    return (
        <MainCard>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <Typography variant="body1">
                        Subtotal
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body1">
                        {'₱'}{subtotal}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body1">
                        Subject to change
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body1">
                        {'₱'}00.00
                    </Typography>
                </Grid>
                <Divider />
                <Grid item xs={6} sx={{ mt: 3 }}>
                    <Typography variant="h4">
                        Total
                    </Typography>
                </Grid>
                <Grid item xs={6} sx={{ mt: 3 }}>
                    <Typography variant="h4">
                        {'₱'}00.00
                    </Typography>
                </Grid>
                <Grid item xs={12} sx={{ mt: 2 }}>
                    <Button fullWidth variant="contained" color={props.isCompleted() ? "success" : "primary"} onClick={props.increment}>
                        {props.isCompleted() ? "Confirm" : "Checkout"}
                    </Button>
                    {
                        props.isInitial() ? <></> : <Button fullWidth sx={{ mt: 1 }} variant="contained" color="secondary" onClick={props.decrement}>
                            Back
                        </Button>
                    }
                </Grid>
            </Grid>
        </MainCard>
    );
}

export default Price;