import { Grid } from '@mui/material';
import HeadInfo from './headinfo';
import Cart from './cart';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useAxios from 'hooks/useAxios';
import Swal from 'sweetalert2';
import Payment from './payment';
import useHighAxios from 'hooks/useHighAxios';

const OrderInfo = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [confirmPayload,setConfirmPayload] = useState({});
    const [orderItems, setOrderItems] = useState({});
    const [orderInfo, setOrderInfo] = useState({});
    const [customerInfo, setCustomerInfo] = useState({});
    const { data } = useAxios('orders/' + id, 'GET', null, false);
    const { highData, highFetchData } = useHighAxios('endpoint d2' + id, 'POST', confirmPayload, false);

    const [showUpload, setShowUpload] = useState(false);
    useEffect(() => {
        if (data) {
            console.log(data.data);
            setCustomerInfo(data.data.profile);
            setOrderItems(data.data.orderItems);
            setOrderInfo({
                dateRequested: '',
                dateRequired: '',
                groupNo: '',
                paymentMethod: data.data.paymentMethod
            });
        }
    }, [data])
    useEffect(()=>{
        if(Object.keys(confirmPayload).length > 0){
            highFetchData();
            setConfirmPayload({});
        }
    },[confirmPayload]);
    useEffect(()=>{
        if(highData){
            const status = highData?.data?.status;
            if(status === 200){
                //swal success
            } else{
                Swal.fire({
                    title:'Confirm Delivery',
                    text:'Failed to confirm delivery. Please try again.',
                    icon: 'error'
                });
            }
        }
    },[highData])
    return (
        <Grid container spacing={1} sx={{ mt: 2 }}>

            <Grid item xs={12} lg={5}>
                <HeadInfo customerInfo={customerInfo} orderItems={orderItems} orderInfo={orderInfo} setShowUpload={setShowUpload} />
            </Grid>
            <Grid item xs={12} lg={7}>
                {showUpload ? <Payment id={id} setConfirmPayload={setConfirmPayload}/> :
                    (
                        <Cart orderItems={orderItems} />
                    )}
            </Grid>
        </Grid>
    );
};

export default OrderInfo;