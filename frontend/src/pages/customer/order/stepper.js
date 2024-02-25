import { Box, Stepper, Step, StepButton, StepLabel, Stack, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import useAxios from 'hooks/useAxios';
import Cart from './cart';
import Checkout from './checkout';
import Confirmation from './confirmation';
import Invoice from './invoice';
import Preview from './preview';
import { useSelector } from 'react-redux';
const steps = ['Purchase Order', 'Payment Method', 'Order Status', 'Order Preview', 'Invoice'];

const InvoiceStepper = (props) => {
  const { accType } = useSelector((state) => state.profile.accType);
  const [orderInfo, setOrderInfo] = useState({});
  const { data } = useAxios('orders/' + props.orderId, 'GET', null, false);
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});

  const handleStep = (step) => () => {
    setActiveStep(step);
  };
  const incrementStep = () => {
    let currentStep = activeStep;
    setActiveStep((currentStep += 1));
  };
  useEffect(() => {
    if (data) {
      const mappedOrders = data?.data.orderItems.map((k) => ({
        ...k,
        products: {
          ...k.products,
          price: accType === 'BUSINESS' ? k.customPrice : k.products.price
        }
      }));
      data.data.orderItems = mappedOrders;
      setOrderInfo(data.data);
    }
  }, [data]);
  function renderStep(activeStep) {
    switch (activeStep) {
      case 0:
        return <Cart orderItems={orderInfo['orderItems']} />;
      case 1:
        return <Checkout order={orderInfo} />;
      case 2:
        return (
          <Confirmation
            paymentUrl={orderInfo['paymentUrl']}
            incrementStep={incrementStep}
            id={orderInfo['id']}
            method={orderInfo['paymentMethod']}
            status={orderInfo['orderStatus']}
            mainStatus={orderInfo['status']}
          />
        );
      case 3:
        return <Preview order={orderInfo} />;
      case 4:
        return <Invoice orderInfo={orderInfo} />;
    }
  }
  if (accType === 'CUSTOMER') {
    steps[0] = 'Checkout';
  }
  if (!data) return;
  return (
    <>
      <Box sx={{ mt: 3, width: '100%' }}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => {
            const labelProps = {};

            labelProps.optional = (
              <Typography variant="caption" color="error">
                Order is still pending
              </Typography>
            );

            labelProps.error = true;

            return (
              <Step key={label} completed={completed[index]}>
                <StepButton color="inherit" onClick={handleStep(index)} disabled={orderInfo?.orderStatus?.length !== 3 && index === 4}>
                  <Stack direction="column" sx={{ alignItems: 'center' }}>
                    {orderInfo?.orderStatus?.length !== 3 && index === 4 ? (
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    ) : (
                      <Typography>{label}</Typography>
                    )}
                  </Stack>
                </StepButton>
              </Step>
            );
          })}
        </Stepper>
      </Box>
      <Grid container sx={{ pt: 2 }}>
        {renderStep(activeStep)}
      </Grid>
    </>
  );
};

export default InvoiceStepper;
