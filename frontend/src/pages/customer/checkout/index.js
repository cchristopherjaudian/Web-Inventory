import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCart, emptyCart } from 'store/reducers/cart';
import Cart from './cart';
import Price from './price';
import Payment from './payment';
import Confirmation from './confirmation';
import useAxios from 'hooks/useAxios';
const steps = ['Cart', 'Payment', 'Invoice'];

const Checkout = () => {


    const [payMethod, setPayMethod] = useState('');
    const [finalCart, setFinalCart] = useState([]);
    const [payload, setPayload] = useState({});
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});
    const { data, fetchData } = useAxios('orders', 'POST', payload);
    const dispatch = useDispatch();

    const totalSteps = () => {
        return steps.length;
    };
    const incrementStep = () => {
        let prev = activeStep;
        console.log('incrementing');
        if ((prev + 1) === totalSteps()) return;
        setActiveStep(prev + 1);
    }
    const decrementStep = () => {
        let prev = activeStep;
        console.log('decrementing');
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
        let newCart = [];
        console.log(finalCart);
        finalCart.forEach((item, index) => {
            newCart.push({
                cartId: item.id,
                inventoryId: item.inventoryId,
                quantity: item.quantity
            });
        });
        let finalPayload = { paymentMethod: payMethod, items: newCart };
        setPayload(finalPayload);
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
            <Box sx={{ mt: 2 }}>
                {
                    activeStep === 0 ? <Cart setFinalCart={setFinalCart} /> : (activeStep === 1) ? <Payment setPayMethod={setPayMethod} /> : <Confirmation />
                }
            </Box>
        </Grid>
        <Grid item xs={12} md={3} sx={{ mt: 5 }}>
            {
                activeStep < (totalSteps() - 1) ? <Price increment={incrementStep} decrement={decrementStep} isCompleted={isCompleted} isInitial={isInitial} parsePayload={parsePayload} /> : <></>
            }
        </Grid>
    </Grid>);
}

export default Checkout;