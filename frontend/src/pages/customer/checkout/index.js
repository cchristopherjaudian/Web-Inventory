import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import Cart from './cart';
import Price from './price';
import Payment from './payment';
import Confirmation from './confirmation';
const steps = ['Cart', 'Payment', 'Invoice'];

const Checkout = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});
    const totalSteps = () => {
        return steps.length;
    };
    const incrementStep = () => {
        let prev = activeStep;
        if((prev + 1) === totalSteps()) return;
        setActiveStep(prev + 1);
    }
    const decrementStep = (prev) => {
        setActiveStep(prev - 1);
    }
    const handleStep = (step) => () => {
        setActiveStep(step);
    };
    const isCompleted = () =>{
        return (activeStep) === (totalSteps() - 2);
    }
    const isInitial = () =>{
        return activeStep === 0;
    }
    return (<Grid container spacing={3} sx={{ pt: 3 }}>
        <Grid item xs={12} md={9}>
            <Box >
                <Stepper nonLinear activeStep={activeStep}>
                    {steps.map((label, index) => (
                        <Step key={label} completed={completed[index]}>
                            <StepButton color="inherit">{/*onClick={handleStep(index)}*/}
                                <Stack direction="column" sx={{ alignItems: 'center' }}>
                                    <Typography>{label}</Typography>

                                </Stack>

                            </StepButton>
                        </Step>
                    ))}
                </Stepper>
            </Box>
            <Box sx = {{mt:2}}>
                {
                    activeStep === 0 ? <Cart /> : (activeStep === 1) ? <Payment /> : <Confirmation/>
                }
            </Box>
        </Grid>
        <Grid item xs={12} md={3} sx = {{mt:5}}>
            {
                activeStep < (totalSteps() - 1) ? <Price increment={incrementStep} isCompleted = {isCompleted} isInitial = {isInitial} /> : <></>
            }
        </Grid>
    </Grid>);
}

export default Checkout;