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
  const [confirmPayload, setConfirmPayload] = useState({});
  const [orderStatusPayload, setOrderStatusPayload] = useState({});
  const [orderItems, setOrderItems] = useState({});
  const [orderInfo, setOrderInfo] = useState({});
  const [customerInfo, setCustomerInfo] = useState({});
  const { data, fetchData } = useAxios('orders/' + id, 'GET', null, true);
  const { highData, highFetchData } = useHighAxios(`orders/${id}`, 'PATCH', confirmPayload, true);
  const { highData: orderStatusRespose, highFetchData: createOrderStatus } = useHighAxios(
    `orders/status`,
    'POST',
    orderStatusPayload,
    true
  );
  const [showUpload, setShowUpload] = useState(false);
  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;

    return `${year}-${month}-${day}`;
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      setCustomerInfo(data.data.profile);
      setOrderItems(data.data.orderItems);
      setOrderStatusPayload({
        orderId: data?.data.id,
        orderStatusId: data?.data.orderStatus?.find((status) => status?.isCurrent)?.id,
        status: 'DELIVERED',
        createdAt: getCurrentDate()
      });
      setOrderInfo({
        dateRequested: '',
        dateRequired: '',
        groupNo: '',
        paymentMethod: data.data.paymentMethod
      });
    }
  }, [data]);

  useEffect(() => {
    if (Object.keys(confirmPayload).length > 0) {
      highFetchData();
      setConfirmPayload({});
    }
  }, [confirmPayload]);
  useEffect(() => {
    if (highData) {
      if (highData?.status === 200) {
        createOrderStatus();
        //swal success
        Swal.fire({
          icon: 'success',
          title: 'Delivery Confirmed',
          text: 'Delivery updated successfully. Click OK to continue',
          allowOutsideClick: false,
          showCancelButton: false,
          confirmButtonText: 'Ok'
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/');
          }
        });
      } else {
        Swal.fire({
          title: 'Confirm Delivery',
          text: 'Failed to confirm delivery. Please try again.',
          icon: 'error'
        });
      }
    }
  }, [highData]);
  return (
    <Grid container spacing={1} sx={{ mt: 2 }}>
      <Grid item xs={12} lg={5}>
        <HeadInfo customerInfo={customerInfo} orderItems={orderItems} orderInfo={orderInfo} setShowUpload={setShowUpload} />
      </Grid>
      <Grid item xs={12} lg={7}>
        {showUpload ? <Payment id={id} setConfirmPayload={setConfirmPayload} /> : <Cart orderItems={orderItems} />}
      </Grid>
    </Grid>
  );
};

export default OrderInfo;
