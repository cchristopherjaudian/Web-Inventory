import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Stack from '@mui/material/Stack';
import CustomerForm from './CustomerForm';
import BusinessForm from './BusinessForm';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxios from 'hooks/useAxios';
import Swal from 'sweetalert2';
const steps = ['Register as Customer', 'Register as Business'];

const RegisterStepper = (props) => {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const [payload, setPayload] = useState({});
    const [completed, setCompleted] = useState({});
    const { data, loading, error, fetchData } = useAxios('profiles', 'POST', payload);
    const totalSteps = () => {
        return steps.length;
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };
    useEffect(() => {
        if (data) {
            if (data.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Account Registration',
                    text: 'Account registered successfully. Click OK to continue',
                    allowOutsideClick: false,
                    showCancelButton: false,
                    confirmButtonText: 'Ok'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/', { replace: true })
                    }
                })

            }
        }
    }, [data]);
    useEffect(() => {
        if (error && Object.keys(payload).length !== 0) {
            let msg = '';
            if (error['response']['status'] === 400) {
                msg = ('Failed to register account. Please validate all fields.')
            } else {
                msg = ('Failed to communicate with server. Please try again.')
            }

            Swal.fire(
                'Account',
                msg,
                'warning'
            );
        }
    }, [error]);
    useEffect(() => {
        if (payload) {
            console.log(payload);
            fetchData();
        }

    }, [payload]);
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