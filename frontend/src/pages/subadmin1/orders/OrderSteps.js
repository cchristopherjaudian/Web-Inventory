import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Stack from '@mui/material/Stack';
import { FormControl, InputAdornment, OutlinedInput } from '@mui/material';
import { EditOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import useAxios from 'hooks/useAxios';
const steps = ['Confirmed', 'Preparing', 'Dispatched', 'Delivered'];

const OrderSteps = (props) => {
  const adminType = useSelector((state) => state.token.admintype.adminType);

  const initialState = [
    {
      CONFIRMED: ''
    },
    {
      PREPARING: ''
    },
    {
      DISPATCHED: ''
    },
    {
      DELIVERED: ''
    }
  ];
  const [isPending, setIsPending] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [stepDate, setStepDate] = useState(initialState);
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [status, setStatus] = useState([]);
  const [orderStatus, setOrderStatus] = useState([]);
  const [orderDate, setOrderDate] = useState('');
  const [payload, setPayload] = useState({});
  const { data, fetchData } = useAxios('orders/status', 'POST', payload);
  const totalSteps = () => {
    return steps.length;
  };
  useEffect(() => {
    if (props.steps && JSON.stringify(steps) !== JSON.stringify(props.steps)) {
      const steps = props.steps;
      setIsPending(props.isPending);
      setOrderStatus(props.steps);
      setActiveStep(steps.length - 1);
      setStatus(steps);

      let newStepDate = [...stepDate];
      steps.forEach((label) => {
        const index = newStepDate.findIndex((obj) => Object.prototype.hasOwnProperty.call(obj, label.status));
        if (index !== -1) {
          newStepDate[index][label.status] = label.createdAt;
        } else {
          newStepDate.push({ [label.status]: label.createdAt });
        }
      });
      setStepDate(newStepDate);
    }
  }, [props.steps]);

  useEffect(() => {
    if (props?.id) {
      resetStepDate();
    }
  }, [props?.id]);

  const resetStepDate = () => {
    setStepDate(initialState);
  };
  useEffect(() => {
    if (Object.keys(payload).length > 0) {
      fetchData();
    }
  }, [payload]);
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      if (data['status'] === 200) {
        let tempStatus = orderStatus;
        tempStatus.push(data['data']);
        setOrderStatus(tempStatus);
        props.handleClick();
        props.setMessage('Order status updated successfully');
      }
      setPayload({});
    }
  }, [data]);

  const handleStep = (step) => () => {
    setActiveStep(step);
  };
  function stepDisabled(index) {
    let isAllowed = false;
    if (adminType === 1) {
      isAllowed = index !== 2;
    } else if (adminType === 3) {
      isAllowed = index === 2;
    }
    return !(isAllowed);
  }
  
  return (
    <Box>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              <Stack direction="column" sx={{ alignItems: 'center' }}>
                <Typography>{label}</Typography>
                {index > 0 ?
                  <FormControl sx={{ width: '90%', mt: 1 }}>
                    <OutlinedInput
                      size="small"
                      type="date"
                      id={index}
                      name={index}
                      tag={index}
                      startAdornment={
                        <InputAdornment position="start">
                          <EditOutlined />
                        </InputAdornment>
                      }
                      onChange={(event) => {
                        let d = new Date(event.target.value);
                        if (Number(d.getTime()) < 0) return;
                        let newStepDate = [...stepDate];
                        const currIndex = index < 1 ? index : index - 1;
                        if (!orderStatus[currIndex]) {
                          return;
                        }

                        let previousStatusId = orderStatus.length > 0 ? orderStatus[currIndex]?.id : '';
                        if (Object.keys(newStepDate[currIndex]).length > 0) {
                          newStepDate[currIndex][Object.keys(newStepDate[currIndex])[0]] = event.target.value;
                          setStepDate(newStepDate);
                        }
                        let objIndex = event.target.name;
                        let objKey = Object.keys(stepDate[objIndex])[0];

                        setPayload({ orderId: props?.id, createdAt: event.target.value, status: objKey, orderStatusId: previousStatusId });
                      }}
                      onKeyPress={(event) => {
                        event.preventDefault();
                      }}
                      inputProps={{
                        'aria-label': 'weight',
                        min: new Date().toISOString().split('T')[0]
                      }}
                      disabled={stepDisabled(index)}
                      value={
                        status && Array.isArray(status) && status[index] && status[index]['createdAt']
                          ? status[index]['createdAt'].substring(0, 10)
                          : stepDate[index][Object.keys(stepDate[index])[0]].substring(0, 10)
                      }
                    />
                  </FormControl>
                  :
                  <Typography>Date d2</Typography>
                }

              </Stack>
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default OrderSteps;
