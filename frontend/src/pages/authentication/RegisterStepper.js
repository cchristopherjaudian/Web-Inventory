import { Box, Grid, Stepper, Step, StepButton, Stack, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from 'store/reducers/token';
import CustomerForm from './CustomerForm';
import BusinessForm from './BusinessForm';

import useAxios from 'hooks/useAxios';
import useMetricsAxios from 'hooks/useMetricsAxios';
import Swal from 'sweetalert2';
const steps = ['Register as Customer', 'Register as Business'];

const RegisterStepper = (props) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token.token);
    const [temporaryToken, setTemporaryToken] = useState('');
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const [payload, setPayload] = useState({});
    const [patchProfile, setPatchProfile] = useState({});
    const [registerProfile, setRegisterProfile] = useState({});
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
                <CustomerForm setPayload={setPayload} activeStep={activeStep} />
            </Grid>
        </>
    );
}

export default RegisterStepper;