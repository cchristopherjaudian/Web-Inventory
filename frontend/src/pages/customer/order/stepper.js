import { Box, Stepper, Step, StepButton, Stack, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import useAxios from 'hooks/useAxios';
import Cart from './cart';
import Checkout from './checkout';
import Confirmation from './confirmation';
import Invoice from './invoice';
const steps = ['Cart', 'Checkout', 'Payment', 'Invoice'];

const InvoiceStepper = (props) => {
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
      setOrderInfo(data['data']);
    }
  }, [data]);
  return (
    <>
      <Box sx={{ mt: 3, width: '100%' }}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                <Stack direction="column" sx={{ alignItems: 'center' }}>
                  <Typography>{label}</Typography>
                </Stack>
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </Box>
      <Grid container sx={{ pt: 2 }}>
        {activeStep === 0 ? (
          <Cart orderItems={orderInfo['orderItems']} />
        ) : activeStep === 1 ? (
          <Checkout order={orderInfo} />
        ) : activeStep === 2 ? (
          <Confirmation
            paymentUrl={orderInfo['paymentUrl']}
            incrementStep={incrementStep}
            id={orderInfo['id']}
            method={orderInfo['paymentMethod']}
            status={orderInfo['orderStatus']}
            mainStatus={orderInfo['status']}
          />
        ) : (
          <Invoice orderInfo={orderInfo} />
        )}
      </Grid>
    </>
  );
};

export default InvoiceStepper;
