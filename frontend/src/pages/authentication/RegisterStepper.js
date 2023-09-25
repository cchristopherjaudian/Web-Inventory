import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Stack from '@mui/material/Stack';
import CustomerForm from './CustomerForm';
import BusinessForm from './BusinessForm';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
const steps = ['Register as Customer', 'Register as Business'];

const RegisterStepper = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});
    const totalSteps = () => {
        return steps.length;
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    return (
        <>
            <Box sx={{ mt: 3 }}>
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
            <Grid container>
                {console.log(activeStep)}
                {activeStep == 0 ? <CustomerForm type="CUSTOMER" /> : <BusinessForm type="BUSINESS" />}
            </Grid>
        </>
    );
}

export default RegisterStepper;