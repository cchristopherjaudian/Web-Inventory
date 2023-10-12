import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Stack from '@mui/material/Stack';
import { Snackbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState, forwardRef } from 'react';
import { useDispatch } from 'react-redux';
import { setCart, emptyCart } from 'store/reducers/cart';
import Cart from './cart';
import Price from './price';
import Payment from './payment';
import Confirmation from './confirmation';
import useAxios from 'hooks/useAxios';
const steps = ['Cart', 'Payment', 'Invoice'];
import MuiAlert from '@mui/material/Alert';
import Swal from 'sweetalert2';
const Checkout = () => {

    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');
    const [open, setOpen] = useState(false);
    const [payMethod, setPayMethod] = useState('');
    const [finalCart, setFinalCart] = useState([]);
    const [payload, setPayload] = useState({});
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});
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
        if ((prev + 1) === totalSteps()) return;

        setActiveStep(prev + 1);
    }
    const decrementStep = () => {
        let prev = activeStep;
        setActiveStep(prev - 1);
    }
    const handleStep = (step) => () => {
        setActiveStep(step);
    };
    const isCompleted = () => {
        return (activeStep) === (totalSteps() - 2);
    }
    const isInitial = () => {
        return activeStep === 0;
    }
    const parsePayload = () => {
        Swal.fire({
            icon: 'question',
            title: 'Checkout Orders',
            text: 'Are you sure you want to proceed with your order?',
            showCancelButton: true,
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                let newCart = [];
                finalCart.forEach((item, index) => {
                    newCart.push({
                        cartId: item.id,
                        productId: item.products.id
                    });
                });
                let finalPayload = { paymentMethod: payMethod, items: newCart };
                setPayload(finalPayload);
            }
        })

    }
    useEffect(() => {
        if (Object.keys(payload).length !== 0) {
            fetchData();
        }

    }, [payload]);
    useEffect(() => {
        if (data) {
            if (data['status'] === 200) {
                incrementStep();
                dispatch(emptyCart());
            }
        }
    }, [data]);
    useEffect(() => {
        if (error) {
            console.log(error);
            let postError = error['response'];
            setSeverity('error');
            if (postError['status'] === 400) {
                setMessage('Please select a payment method');
            } else {
                setMessage('Failed to process request. Please try again');
            }
            setOpen(true);
        }
    }, [error]);
    return (<Grid container spacing={3} sx={{ pt: 3 }}>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
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
            <Box sx={{ mt: 2 }}>
                {
                    activeStep === 0 ? <Cart setFinalCart={setFinalCart} /> : (activeStep === 1) ? <Payment setPayMethod={setPayMethod} /> : <Confirmation />
                }
            </Box>
        </Grid>
        <Grid item xs={12} md={3} sx={{ mt: 5 }}>
            {
                activeStep < (totalSteps() - 1) ? <Price increment={incrementStep} decrement={decrementStep} isCompleted={isCompleted} isInitial={isInitial} parsePayload={parsePayload} payMethod={payMethod} /> : <></>
            }
        </Grid>
    </Grid>);
}

export default Checkout;