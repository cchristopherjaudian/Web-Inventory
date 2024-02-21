import firebaseConfig from 'config/firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Grid, Button, Typography } from '@mui/material';
import useAxios from 'hooks/useAxios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
const Confirmation = (props) => {
  const [payload, setPayload] = useState({});
  const { data, fetchData } = useAxios('orders/' + props.id, 'PATCH', payload, true);

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
        props.incrementStep();
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

  return (
    <Grid container spacing={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        {props.mainStatus === 'PENDING' ? (
          <>
            <Typography variant="h2" sx={{ color: '#d35400', mt: 4 }}>
              Your Order is Pending...
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
        {props.mainStatus === 'PENDING' ? (
          <Button variant="contained" color="error">
            Cancel Order
          </Button>
        ) : (
          <Typography variant="h1">{props.status.length >= 3 ? 'Delivery Completed' : 'Waiting for Delivery'}</Typography>
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
