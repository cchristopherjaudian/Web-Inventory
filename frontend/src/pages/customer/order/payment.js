import MainCard from "components/MainCard";
import { Button, Divider, Grid, Typography } from '@mui/material';

const Payment = ({ order = {} }) => {
    let totalAmount = order['orderItems'].reduce((sum, item) => {
        return sum + (item.quantity * parseFloat(item.products.price));
    }, 0);
    return (<MainCard>
        <Grid container spacing={1}>
            <Grid item xs={6}>
                <Typography variant="body1">
                    Subtotal
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="body1">
                    {'₱'}{totalAmount}
                </Typography>
            </Grid>
           
            <Divider />

            <Grid item xs={6}>
                <Typography variant="body1">
                    Payment Method
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="body1">
                    {order['paymentMethod']}
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
                    {'₱'}{totalAmount}
                </Typography>
            </Grid>
        </Grid>
    </MainCard>);
}

export default Payment;