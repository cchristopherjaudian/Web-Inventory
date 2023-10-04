import MainCard from "components/MainCard";
import { Grid, Typography, Stack } from '@mui/material';
import OrderSteps from "./OrderSteps";
import { useEffect, useState } from "react";
const OrderConfirmation = (props) => {

    const [orderInfo,setOrderInfo] = useState({});
    const [steps,setSteps] = useState([]);
    useEffect(()=>{
        setOrderInfo(props.selectedOrder);
    },[props.selectedOrder]);
    useEffect(()=>{
        if(props.orderSteps){
            setSteps(props.orderSteps);
        }
    },[props.orderSteps]);
    return (<Grid item xs={12}>
        <MainCard title={orderInfo.firstname ? orderInfo.firstname + ' ' + orderInfo.middlename + ' ' + orderInfo.lastname : ''}>
            <Grid container spacing={3} sx={{ display: 'flex', alignItems: 'center' }}>
                <Grid item xs= {12}>
                    <Stack direction="column">
                        <Typography variant="h4">Order ID: {orderInfo.id}</Typography>
                        <Stack direction="row" gap={1}>
                            <Typography variant="caption">Order Date:</Typography>
                            <Typography variant="caption">{orderInfo.createdAt}</Typography>
                            <Typography variant="caption">|</Typography>
                            <Typography variant="caption">Estimated Delivery Date:</Typography>
                            <Typography variant="caption">{''}</Typography>
                        </Stack>
                    </Stack>
                </Grid>
                <Grid item sx={{ flexGrow: 1 }} xs= {12}>
                    <OrderSteps id = {orderInfo.id} steps={steps} />
                </Grid>
            </Grid>
        </MainCard>
    </Grid>);
}

export default OrderConfirmation;