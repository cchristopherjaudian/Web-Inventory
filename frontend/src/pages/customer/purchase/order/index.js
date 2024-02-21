import { Grid } from '@mui/material';
import HeadInfo from './headinfo';
import Cart from './cart';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useAxios from 'hooks/useAxios';
import useHighAxios from 'hooks/useHighAxios';
import Swal from 'sweetalert2';
import Payment from './payment';
import Acknowledge from './acknowledge';
const Order = () => {
  let { id } = useParams();
  const [orderId, setOrderId] = useState('');
  const [showAck, setShowAck] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');
  const navigate = useNavigate();
  const [mapPayload, setMapPayload] = useState({});
  const [payMethod, setPaymethod] = useState('');
  const [refNo, setReferenceNo] = useState('');
  const [termsApproved, setTermsApproved] = useState(false);
  const [prInfo, setPrInfo] = useState({});
  const { data } = useAxios('purchase/' + id, 'GET', null, false);
  const { highData, highLoading, highFetchData } = useHighAxios('orders', 'POST', mapPayload, true);
  useEffect(() => {
    if (data) {
      let totalValue = data['data']['list']?.reduce((total, item) => {
        return total + item.quantity * item.products.price;
      }, 0);
      setPrInfo({ ...data['data'], totalAmount: totalValue });
    }
  }, [data]);
  const proceedCheckout = () => {
    let msg = '';
    if (['GCASH', 'BANK_TRANSFER'].includes(payMethod) && !refNo) {
      msg = 'Please add a reference number.';
    }
    if (!termsApproved) {
      msg = 'Please accept the terms and agreement.';
    }
    if (!payMethod) {
      msg = 'Please select a payment method from the list';
    }
    if (prInfo.list.length === 0) {
      msg = 'No products found for this purchase request/quotation';
    }
    if (paymentUrl === '' && payMethod !== 'COD') {
      msg = 'Please attach an image of your payment.';
    }

    if (msg) {
      Swal.fire({
        icon: 'info',
        title: 'Create Purchase Order',
        text: msg,
        showCancelButton: false,
        allowOutsideClick: false,
        confirmButtonText: 'OK'
      });
      return;
    }
    Swal.fire({
      icon: 'question',
      title: 'Purchase Order',
      text: 'Are you sure you want to proceed with your order?',
      showCancelButton: true,
      confirmButtonText: 'Yes'
    }).then((result) => {
      const paymentField = payMethod === 'PAY_LATER' ? 'quotationUrl' : 'paymentUrl';
      const paymentUrlObject = {
        [paymentField]: paymentUrl
      };
      const refNoObj = {
        refNo
      };
      if (result.isConfirmed) {
        const mapProducts = prInfo.list.map((pr, i) => ({
          cartId: pr['id'],
          productId: pr['products']['id']
        }));
        setMapPayload({
          paymentMethod: payMethod,
          items: mapProducts,
          ...(payMethod !== 'COD' && paymentUrlObject),
          ...(['GCASH', 'BANK_TRANSFER'].includes(payMethod) && refNoObj)
        });
      }
    });
  };
  useEffect(() => {
    if (mapPayload) {
      highFetchData();
    }
  }, [mapPayload]);
  useEffect(() => {
    if (highData) {
      if (highData['status'] === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Purchase Order',
          text: 'PO created successfully. Click OK to continue',
          allowOutsideClick: false,
          showCancelButton: false,
          confirmButtonText: 'Ok'
        }).then((result) => {
          if (result.isConfirmed) {
            const orderId = highData?.data?.id;
            setShowAck(true);
            setOrderId(orderId);
          }
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Purchase Order',
          text: 'Failed to create PO. Please try again',
          allowOutsideClick: false,
          showCancelButton: false,
          confirmButtonText: 'Ok'
        });
      }
    }
  }, [highData]);

  return (
    <Grid container spacing={1} sx={{ mt: 2 }}>
      {!showAck ? (
        <>
          <Grid item xs={12} lg={3}>
            <HeadInfo
              setShowQR={setShowQR}
              setPaymentUrl={setPaymentUrl}
              highLoading={highLoading}
              prInfo={prInfo}
              payMethod={payMethod}
              setPaymethod={setPaymethod}
              proceedCheckout={proceedCheckout}
              setTermsApproved={setTermsApproved}
              termsApproved={termsApproved}
            />
          </Grid>
          <Grid item xs={12} lg={9}>
            {showQR && payMethod !== 'COD' ? (
              <Payment setPaymentUrl={setPaymentUrl} setReferenceNumber={setReferenceNo} paymentMethod={payMethod} setShowQR={setShowQR} />
            ) : (
              <Cart prInfo={prInfo} />
            )}
          </Grid>
        </>
      ) : (
        <Acknowledge orderId={orderId} />
      )}
    </Grid>
  );
};

export default Order;
