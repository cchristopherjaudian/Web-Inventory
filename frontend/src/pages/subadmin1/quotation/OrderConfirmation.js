import MainCard from 'components/MainCard';
import { Button, Grid, Typography, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxios from 'hooks/useAxios';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const confirmOrder = () => {
    Swal.fire({
      allowOutsideClick: false,
      title: 'Order Confirmation',
      text: 'Are you sure you want to set this order to CONFIRMED?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Confirm'
    }).then((result) => {
      if (result.isConfirmed) {
        setPayload({ orderId: orderId, createdAt: getCurrentDate(), status: 'PREPARING' });
      }
    });
  };


  function getCurrentDate() {
    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;

    return `${year}-${month}-${day}`;
  }

  return (
    <Grid item xs={12}>
      <MainCard title='Customer Name here'>
        <Grid container spacing={3} sx={{ display: 'flex', alignItems: 'center' }}>
          <Grid item xs={12}>
            <Stack direction="column">
              <Grid item xs={12} container justifyContent="space-between">
                <Typography variant="h4">Order ID: 12345678</Typography>
                <Stack direction="row">
                  <Typography variant="h4">Total Price:</Typography>
                  <Typography variant="h4">12345678</Typography>
                </Stack>

              </Grid>
              <Grid item xs={12} container justifyContent="space-between">
                <Grid item xs={6} container justifyContent="flex-start">
                  <Typography variant="caption">Date Requested:</Typography>
                  {/* {orderInfo.createdAt && <Typography variant="caption">{orderInfo.createdAt?.substring(0, 10)}</Typography>} */}

                </Grid>
                <Grid item xs={6} container justifyContent="flex-end">
                  <Button variant="contained" onClick={() => navigate("/quotation/id", { replace: true })}>CREATE QUOTATION</Button>
                </Grid>
              </Grid>


            </Stack>
          </Grid>
        </Grid>
      </MainCard>
    </Grid>
  );
};

export default OrderConfirmation;
