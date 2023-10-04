import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Stack from '@mui/material/Stack';
import { FormControl, InputAdornment, OutlinedInput } from '@mui/material';
import { EditOutlined } from '@ant-design/icons';

import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import useAxios from 'hooks/useAxios';
const steps = ['Preparing', 'Dispatched', 'Delivered'];

const OrderSteps = (props) => {
    const initialState = [
        {
            "PREPARING": ''
        },
        {
            "DISPATCHED": ''
        },
        {
            "DELIVERED": ''
        }
    ]
    const [stepIndex, setStepIndex] = useState(0);
    const [stepDate, setStepDate] = useState(initialState);
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});
    const [status, setStatus] = useState([]);
    const [orderDate, setOrderDate] = useState('');
    const [payload, setPayload] = useState({});
    const { data, fetchData } = useAxios('orders/status', 'POST', payload, false);
    const totalSteps = () => {
        return steps.length;
    };
    useEffect(() => {
        if (props.steps && JSON.stringify(steps) !== JSON.stringify(props.steps)) {
            const steps = props.steps;

            setActiveStep(steps.length - 1);
            setStatus(steps);

            let newStepDate = [...stepDate];
            steps.forEach((label) => {

                const index = newStepDate.findIndex(obj => Object.prototype.hasOwnProperty.call(obj, label.status));
                if (index !== -1) {
                    newStepDate[index][label.status] = label.createdAt;
                } else {
                    newStepDate.push({ [label.status]: label.createdAt });
                }
            });
            setStepDate(newStepDate);
        }
    }, [props.steps]);

    // useEffect(() => {
    //     if (props.steps) {
    //         const steps = props.steps;

    //         setActiveStep(steps.length - 1);
    //         setStatus(steps);

    //         let newStepDate = [...stepDate];
    //         steps.forEach((label) => {

    //             const index = newStepDate.findIndex(obj => Object.prototype.hasOwnProperty.call(obj, label.status));
    //             if (index !== -1) {
    //                 newStepDate[index][label.status] = label.createdAt;
    //             } else {
    //                 newStepDate.push({ [label.status]: label.createdAt });
    //             }
    //         });
    //         setStepDate(newStepDate);


    //     }
    // }, [props.steps]);
    useEffect(()=>{
        if(props.id){
            resetStepDate();
        }
    },[props.id]);
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            if (event.target.value) {
                let objIndex = event.target.name;
                let objKey = Object.keys(stepDate[objIndex])[0];
                setPayload({ orderId: props.id, createdAt: event.target.value, status: objKey })
            }
        }
    };
    const resetStepDate = () => {
        setStepDate(initialState);
    };
    useEffect(() => {
        if (payload) {
            fetchData();
        }
    }, [payload]);
    useEffect(() => {
        if (data) {
            console.log(data);
        }
    }, [data]);
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
                                <FormControl sx={{ width: '70%', mt: 1 }}>
                                    <OutlinedInput
                                        size="small"
                                        id={index}
                                        name={index}
                                        tag={index}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <EditOutlined />
                                            </InputAdornment>
                                        }
                                        onKeyDown={handleKeyDown}
                                        onChange={(event) => {
                                            let newStepDate = [...stepDate];
                                            if (Object.keys(newStepDate[index]).length > 0) {
                                                newStepDate[index][Object.keys(newStepDate[index])[0]] = event.target.value;
                                                setStepDate(newStepDate);
                                            }
                                        }}
                                        inputProps={{
                                            'aria-label': 'weight'
                                        }}
                                        value={status && Array.isArray(status) && status[index] && status[index]['createdAt'] ? status[index]['createdAt'].substring(0, 10) : stepDate[index][Object.keys(stepDate[index])[0]].substring(0, 10)}
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