import firebaseConfig from 'config/firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { Grid, Button, Typography } from '@mui/material';
import useAxios from 'hooks/useAxios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
const Confirmation = (props) => {
  const navigate = useNavigate();
  const [payload, setPayload] = useState({});
  const { data, fetchData } = useAxios('orders/' + props.id, 'PATCH', payload, true);
  const [cancelId,setCancelId] = useState('');
  const { highData, highFetchData } = useHighAxios('orders/cancellation/' + cancelId, 'PATCH');
  useEffect(() => {
    if (Object.keys(payload).length !== 0) {
      fetchData();
    }
  }, [payload]);
  useEffect(() => {
    if (data) {
      if (data['status'] === 200) {
        Swal.fire({
          title: 'Payment Confirmation',
          text: 'Payment uploaded successfully',
          icon: 'success',
          allowOutsideClick: false
        });
        navigate('/history',{replace:true});
      } else {
        Swal.fire({
          title: 'Payment Confirmation',
          text: 'Failed to upload payment. Please try again.',
          icon: 'error',
          allowOutsideClick: false
        });
      }
    }
  }, [data]);
  function renderStatus(statusLength) {
    switch (statusLength) {
      case 0:
        return "Your order is pending....";
      case 1:
        return "Oxiaire is preparing your order";
      case 2:
        return "Your order has been dispatched...\nWaiting for delivery...";
      case 3:
        return "Your order has been delivered";
    }
  }

  const cancelOrder = () => {
    Swal.fire({
      allowOutsideClick: false,
      title: 'Order Cancellation',
      text: 'Are you sure you want to CANCEL this order?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Cancel',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        setCancelId(orderId);
      }
    });
  };
  useEffect(() => {
    if (cancelId) {
      highFetchData();
      setCancelId('');
    }
  }, [cancelId]);

  return (
    <Grid container spacing={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        {props.mainStatus === 'PENDING' ? (
          <>
            <Typography variant="h2" sx={{ color: '#d35400', mt: 4 }}>
              {renderStatus(props.status.length)}
            </Typography>
          </>
        ) : (
          <img
            src={
              props.status.length < 3
                ? props.method === 'PAY_LATER'
                  ? '/asset/Gcash-MyQR.png'
                  : '/asset/shopping-basket.png'
                : '/asset/delivery-truck.png'
            }
            width={400}
            height={props.status.length < 3 && props.method === 'PAY_LATER' ? 600 : 400}
            alt="payment"
          />
        )}
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        {props.status.length === 0 && (
          <Button variant="contained" color="error" onClick={()=> cancelOrder()}>
            Cancel Order
          </Button>
        )}
      </Grid>
      {props.status.length >= 3 && (
        <>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h4" mt={3}>
              Your order has been delivered to you.
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h5">Date Delivered: {props.status[2]?.createdAt?.substring(0, 10)}</Typography>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Confirmation;
