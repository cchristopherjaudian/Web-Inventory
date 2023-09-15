import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Stack from '@mui/material/Stack';
import { FormControl, InputAdornment, OutlinedInput } from '@mui/material';
import { EditOutlined } from '@ant-design/icons';

import Typography from '@mui/material/Typography';
import { useState } from 'react';
const steps = ['Order Confirmed', 'Preparing', 'Dispatched', 'Delivered'];

const OrderSteps = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});
    const totalSteps = () => {
        return steps.length;
    };



    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    return (
        <Box>
            <Stepper nonLinear activeStep={activeStep}>
                {steps.map((label, index) => (
                    <Step key={label} completed={completed[index]}>
                        <StepButton color="inherit" onClick={handleStep(index)}>
                            <Stack direction="column" sx={{ alignItems: 'center' }}>
                                <Typography>{label}</Typography>
                                <Typography variant="caption">yyyy-MM-dd</Typography>
                                <FormControl sx={{ width: '50%' }}>
                                    <OutlinedInput
                                        size="small"
                                        id="header-search"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <EditOutlined />
                                            </InputAdornment>
                                        }
                                        aria-describedby="header-search-text"
                                        inputProps={{
                                            'aria-label': 'weight'
                                        }}
                                    />
                                </FormControl>
                            </Stack>

                        </StepButton>
                    </Step>
                ))}
            </Stepper>

        </Box>
    );
}

export default OrderSteps;