import MainCard from "components/MainCard";
import { Button, Grid, Typography, Stack } from '@mui/material';
import OrderSteps from "./OrderSteps";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxios from "hooks/useAxios";
const OrderConfirmation = (props) => {

    const [orderInfo, setOrderInfo] = useState({});
    const [pending, setPending] = useState(false);
    const [steps, setSteps] = useState([]);
    const [orderId, setOrderId] = useState('');
    const [payload, setPayload] = useState({});
    const { data, fetchData } = useAxios('orders/status', 'POST', payload);
    useEffect(() => {
        setPending(props.selectedOrder['status']);
        setOrderInfo(props.selectedOrder);
      
        setOrderId(props.selectedOrder['id']);
    }, [props.selectedOrder]);
    useEffect(() => {
        if (props.orderSteps) {
            setSteps(props.orderSteps);
        }
    }, [props.orderSteps]);
    const confirmOrder = () => {
        Swal.fire({
            allowOutsideClick: false,
            title: "Order Confirmation",
            text: "Are you sure you want to set this order to CONFIRMED?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, Confirm"
        }).then((result) => {
            if (result.isConfirmed) {
                setPayload({ orderId: orderId, createdAt: getCurrentDate(), status: 'PREPARING' })
            }
        });
    }
    useEffect(() => {
        if (Object.keys(payload).length > 0) {
            fetchData();
        }
    }, [payload])
    useEffect(() => {
        if (data) {
            if (data['status'] === 200) {
                console.log(data);
            }
        }
    }, [data]);
    function getCurrentDate() {
        const date = new Date();
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        if (month < 10) month = '0' + month;
        if (day < 10) day = '0' + day;

        return `${year}-${month}-${day}`;
    }

    console.log(getCurrentDate()); // Call the function and log the result

    return (<Grid item xs={12}>
        <MainCard title={orderInfo.firstname ? orderInfo.firstname + ' ' + orderInfo.middlename + ' ' + orderInfo.lastname : ''}>
            <Grid container spacing={3} sx={{ display: 'flex', alignItems: 'center' }}>
                <Grid item xs={12}>
                    <Stack direction="column">
                        <Typography variant="h4">Order ID: {orderInfo.id && orderInfo.id}</Typography>
                        <Stack direction="row" gap={1}>
                            <Typography variant="caption">Order Date:</Typography>
                            {orderInfo.createdAt && <Typography variant="caption">{orderInfo.createdAt?.substring(0, 10)}</Typography>}

                        </Stack>
                        {
                            (props.statusCount < 2 && Object.keys(props.selectedOrder).length > 0) && <Stack direction="row" gap={1} mt={2}>
                                <Button variant="contained" onClick={() => confirmOrder()}>Confirm Order</Button>
                            </Stack>
                        }


                    </Stack>
                </Grid>
                <Grid item sx={{ flexGrow: 1 }} xs={12}>
                    {orderInfo.id && <OrderSteps isPending={pending} handleClick={props.handleClick} setMessage={props.setMessage} id={orderInfo.id} steps={steps} />}

                </Grid>
            </Grid>
        </MainCard>
    </Grid>);
}

export default OrderConfirmation;