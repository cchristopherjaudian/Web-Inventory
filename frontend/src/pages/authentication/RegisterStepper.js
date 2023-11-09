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
    // const { data, error, fetchData } = useAxios('accounts', 'POST', registerProfile);
    // const { metricsData, metricsFetchData } = useMetricsAxios('profiles', 'POST', patchProfile, true, temporaryToken);
    const totalSteps = () => {
        return steps.length;
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    // useEffect(() => {
    //     if (error && Object.keys(payload).length !== 0) {
    //         let msg = '';
    //         if (error['response']['status'] === 400) {
    //             msg = ('Failed to register account. Please validate all fields.')
    //         } else {
    //             msg = ('Failed to communicate with server. Please try again.')
    //         }

    //         Swal.fire(
    //             'Account',
    //             msg,
    //             'warning'
    //         );
    //     }
    // }, [error]);
    // useEffect(() => {
    //     if (payload) {
    //         console.log('Payload');
    //         console.log(payload);
    //         const registerPayload = {
    //             username: payload['contact'],
    //             password: payload['password'],
    //             accountType: activeStep === 0 ? 'CUSTOMER' : 'BUSINESS'
    //         };
    //         const patchPayload = {
    //             firstname: payload['firstname'],
    //             middlename: payload['middlename'],
    //             lastname: payload['lastname'],
    //             address: payload['address'],
    //             emailAddress: payload['email'],
    //         }
    //         if (activeStep === 1) {
    //             patchPayload.businessName = payload['businessName'];
    //         }
    //         console.log(patchPayload);
    //         setRegisterProfile(registerPayload);
    //         setPatchProfile(patchPayload);
    //     }

    // }, [payload]);
    // useEffect(() => {
    //     if (registerProfile) {
    //         console.log('registerProfile');
    //         fetchData();
    //     }
    // }, [registerProfile]);
    // useEffect(() => {
    //     if (data) {
    //         console.log(data['data']['token']);
    //         if (data.status === 200) {
    //             const newToken = data['data']['token'];
    //             setTemporaryToken(newToken);
    //             dispatch(setToken({ token: newToken }));
    //         }
    //     }
    // }, [data]);
    // useEffect(() => {
    //     if (temporaryToken) {
    //         console.log(temporaryToken);
    //         metricsFetchData();
    //     }
    // }, [temporaryToken]);
    // useEffect(() => {
    //     if (metricsData) {
    //         if (metricsData['status'] === 200) {
    //             Swal.fire({
    //                 icon: 'success',
    //                 title: 'Account Registration',
    //                 text: 'Account registered successfully. Click OK to continue',
    //                 allowOutsideClick: false,
    //                 showCancelButton: false,
    //                 confirmButtonText: 'Ok'
    //             }).then((result) => {
    //                 if (result.isConfirmed) {
    //                     navigate('/', { replace: true })
    //                 }
    //             })
    //         }
    //     }
    // }, [metricsData]);
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