import { Box, Button, Grid, Stepper, Step, StepButton, Stack, Snackbar, Typography, TextField } from '@mui/material';
import { useEffect, useState, forwardRef } from 'react';
import { useDispatch } from 'react-redux';
import { setCart, emptyCart } from 'store/reducers/cart';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PO from './po';
import Cart from './cart';
import Price from './price';
import Payment from './payment';
import Confirmation from './confirmation';
import useAxios from 'hooks/useAxios';
const steps = ['Cart', 'Payment', 'Order Summary'];
import MuiAlert from '@mui/material/Alert';
import Swal from 'sweetalert2';
import MainCard from 'components/MainCard';
const Checkout = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cart);
  const profile = useSelector((state) => state.profile);
  const [paymentUrl, setPaymentUrl] = useState('');
  const [referenceNo, setReferenceNo] = useState('');
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const [open, setOpen] = useState(false);
  const [payMethod, setPayMethod] = useState('');
  const [finalCart, setFinalCart] = useState([]);
  const [payload, setPayload] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [price, setPrice] = useState(0);
  const { data, error, fetchData } = useAxios('orders', 'POST', payload);
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert sx={{ color: 'white' }} elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };
  const totalSteps = () => {
    return steps.length;
  };
  const incrementStep = () => {
    let prev = activeStep;
    if (prev + 1 === totalSteps()) return;

    setActiveStep(prev + 1);
  };
  const decrementStep = () => {
    let prev = activeStep;
    setActiveStep(prev - 1);
  };
  const handleStep = (step) => () => {
    setActiveStep(step);
  };
  const isCompleted = () => {
    return activeStep === totalSteps() - 2;
  };
  const isInitial = () => {
    return activeStep === 0;
  };
  const parsePayload = () => {
    if (payMethod === '') {
      Swal.fire('Checkout Order', 'Please select a payment method', 'warning');
      return;
    }
    if ((payMethod === 'GCASH' || payMethod === 'BANK_TRANSFER') && !paymentUrl) {
      Swal.fire('Checkout Order', 'Please upload a payment image', 'warning');
      return;
    }
    if ((payMethod === 'GCASH' || payMethod === 'BANK_TRANSFER') && !referenceNo) {
      Swal.fire('Checkout Order', 'Please add a reference number.', 'warning');
      return;
    }
    Swal.fire({
      icon: 'question',
      title: 'Checkout Orders',
      text: 'Are you sure you want to proceed with your order?',
      showCancelButton: true,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        const newCart = [];
        finalCart.forEach((item, index) => {
          newCart.push({
            cartId: item.id,
            productId: item.products.id
          });
        });
        const finalPayload = { paymentMethod: payMethod, items: newCart, paymentUrl: paymentUrl, refNo: referenceNo };

        if (payMethod === 'COD') {
          Object.keys(finalPayload).forEach((key) => {
            if (!finalPayload[key]) delete finalPayload[key];
          });
        }
        setPayload(finalPayload);
      }
    });
  };
  useEffect(() => {
    if (Object.keys(payload).length !== 0) {
      fetchData();
    }
  }, [payload]);
  useEffect(() => {
    if (data) {
      if (data['status'] === 200) {
        dispatch(emptyCart());
        profile.accType.accType === 'CUSTOMER'
          ? incrementStep()
          : Swal.fire({
              icon: 'success',
              title: 'Checkout',
              text: 'Order has been placed. Click OK to continue',
              allowOutsideClick: false,
              showCancelButton: false,
              confirmButtonText: 'OK'
            }).then((result) => {
              if (result.isConfirmed) {
                navigate('/home', { replace: true });
              }
            });
      }
    }
  }, [data]);
  useEffect(() => {
    const totalPrice =
      cartItems && Object.keys(cartItems).length
        ? cartItems.reduce((sum, item) => {
            return sum + item.quantity * parseFloat(item.products.price);
          }, 0)
        : 0;

    setPrice(totalPrice);
  }, [cartItems]);
  useEffect(() => {
    if (error) {
      let postError = error['response'];
      setSeverity('error');
      if (postError['status'] === 400) {
        setMessage(postError.data?.data.message);
      } else {
        setMessage('Failed to process request. Please try again');
      }
      setOpen(true);
    }
  }, [error]);

  return (
    <Grid container spacing={3} sx={{ pt: 3 }}>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      {profile.accType.accType === 'CUSTOMER' ? (
        <>
          <Grid item xs={12} md={8}>
            <Box>
              <Stepper nonLinear activeStep={activeStep}>
                {steps.map((label, index) => (
                  <Step key={label} completed={completed[index]}>
                    <StepButton color="inherit">
                      {/*onClick={handleStep(index)}*/}
                      <Stack direction="column" sx={{ alignItems: 'center' }}>
                        <Typography>{label}</Typography>
                      </Stack>
                    </StepButton>
                  </Step>
                ))}
              </Stepper>
            </Box>
            <Box sx={{ mt: 2 }}>
              {activeStep === 0 ? (
                <Cart setFinalCart={setFinalCart} />
              ) : activeStep === 1 ? (
                <Payment
                  setPaymentUrl={setPaymentUrl}
                  setReferenceNumber={setReferenceNo}
                  paymentMethod={payMethod}
                  setPayMethod={setPayMethod}
                />
              ) : (
                <Confirmation />
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            {activeStep < totalSteps() - 1 ? (
              <Price
                increment={incrementStep}
                decrement={decrementStep}
                isCompleted={isCompleted}
                isInitial={isInitial}
                parsePayload={parsePayload}
                payMethod={payMethod}
              />
            ) : (
              <></>
            )}
          </Grid>
        </>
      ) : (
        <>
          <Grid item xs={12} md={4}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <MainCard title="Business Information">
                  <PO />
                </MainCard>
              </Grid>
              <Grid item xs={12}>
                <MainCard title="Note">
                  <Typography variant="body1">Payment shall be 30 days upon receipt of the item(s) selected</Typography>
                </MainCard>
              </Grid>
              <Grid item xs={12}>
                <MainCard title="Payment Information">
                  <Payment setPayMethod={setPayMethod} />
                  <Grid container spacing={1} sx={{ mt: 2 }}>
                    <Grid item xs={6}>
                      <TextField required fullWidth id="method" label="Payment Method" name="method" disabled value={payMethod} />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField required fullWidth id="amount" label="Total Amount" name="amount" disabled value={price} />
                    </Grid>
                  </Grid>
                </MainCard>
              </Grid>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Button fullWidth variant="contained" onClick={parsePayload}>
                  Proceed
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={8}>
            <MainCard title="Selected Products">
              <Cart setFinalCart={setFinalCart} />
            </MainCard>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Checkout;
