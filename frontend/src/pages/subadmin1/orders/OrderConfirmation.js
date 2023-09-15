import MainCard from "components/MainCard";
import { Grid, Typography, Stack } from '@mui/material';
import OrderSteps from "./OrderSteps";
const OrderConfirmation = () => {
    return (<Grid item xs={12}>
        <MainCard title="Customer Name">
            <Grid container spacing={3} sx={{ display: 'flex', alignItems: 'center' }}>
                <Grid item>
                    <Stack direction="column">
                        <Typography variant="h4">Order ID: 1234567890</Typography>
                        <Stack direction="row" gap={1}>
                            <Typography variant="caption">Order Date:</Typography>
                            <Typography variant="caption">0000-00-00</Typography>
                            <Typography variant="caption">|</Typography>
                            <Typography variant="caption">Estimated Delivery Date:</Typography>
                            <Typography variant="caption">0000-00-00</Typography>
                        </Stack>
                    </Stack>
                </Grid>
                <Grid item sx={{ flexGrow: 1 }}>
                    <OrderSteps />
                </Grid>
            </Grid>
        </MainCard>
    </Grid>);
}

export default OrderConfirmation;