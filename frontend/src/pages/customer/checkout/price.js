import MainCard from "components/MainCard";
import { Button, Divider, Grid, Typography } from '@mui/material';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useAxios from "hooks/useAxios";
const Price = (props) => {
    const cartItems = useSelector((state) => state.cart.cart);
    const [price,setPrice] = useState(0);
    const [subtotal, setSubTotal] = useState(0);
    const { data, fetchData } = useAxios('orders', 'POST', cartItems);
    const [change,setChange] = useState(0);
    useEffect(() => {
        const totalPrice = cartItems && Object.keys(cartItems).length
            ? cartItems[0].reduce((total, item) => total + Number(item.inventory.products.price) * item.quantity, 0)
            : 0;
            
        setSubTotal(totalPrice);
    }, [cartItems]);

    const processCheckout = () => {
        props.parsePayload();
        //fetchData();
    };
    useEffect(() => {
        if (data) {
            props.increment;
        }
    }, [data]);
    useEffect(()=>{
        setPrice(change + subtotal);
    },[change,subtotal]);
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
                        {'₱'}{price}
                    </Typography>
                </Grid>
                <Grid item xs={12} sx={{ mt: 2 }}>
                    {
                        props.isCompleted() ?
                            <Button fullWidth variant="contained" color="success" onClick={() => processCheckout()}>
                                Confirm
                            </Button>
                            :
                            (Object.keys(cartItems).length > 0) ?
                            <Button fullWidth variant="contained" color="primary" onClick={props.increment}>
                                Checkout
                            </Button>
                            :
                            <></>
                    }
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