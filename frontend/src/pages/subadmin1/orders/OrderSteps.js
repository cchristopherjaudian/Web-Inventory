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
import { useNavigate } from 'react-router-dom';
const steps = ['Confirmed', 'Preparing', 'Dispatched', 'Delivered'];

const OrderSteps = (props) => {
  const adminType = useSelector((state) => state.token.admintype.adminType);
  const navigate = useNavigate();
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
          setActiveStep(index);
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
        props.setSelectedOrder(null);
        props.refreshTable();
        tempStatus.push(data['data']);
        setOrderStatus(tempStatus);
        props.handleClick();
        props.setMessage('Order status updated successfully');

        navigate('/orders', { replace: true });
      }
      setPayload({});
    }
  }, [data]);

  const handleStep = (step) => () => {
    setActiveStep(step);
  };
  function stepDisabled(index) {
    let isAllowed = false;

    if (adminType === 1 && index !== 2) {
      isAllowed = false;
    }
    if (adminType === 1 && index === 3) {
      isAllowed = true;
    }
    if (adminType === 3) {
      isAllowed = index === 2;
    }
    if (index === 1) isAllowed = false;
    if ((index - 2) > orderStatus.length) isAllowed = false;
    return !isAllowed;
  }

  return (
    <Box>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => {
          return (
            <Step key={label}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                <Stack direction="column" sx={{ alignItems: 'center' }}>
                  <Typography>{label}</Typography>
                  {index > 0 ? (
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
                          const d = new Date(event.target.value);
                          if (Number(d.getTime()) < 0) return;
                          const newStepDate = [...stepDate];

                          const previousStatusId = orderStatus.length > 0 ? orderStatus.find((order) => order.isCurrent).id : '';
                          if (Object.keys(newStepDate[orderStatus.length - 1]).length > 0) {
                            newStepDate[orderStatus.length - 1][Object.keys(newStepDate[orderStatus.length - 1])[0]] = event.target.value;
                            setStepDate(newStepDate);
                          }
                          const objIndex = event.target.name;
                          const objKey = Object.keys(stepDate[objIndex])[0];
                          setPayload({
                            orderId: props?.id,
                            createdAt: event.target.value,
                            status: objKey,
                            orderStatusId: previousStatusId
                          });
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
                          status?.length && status[index - 1] && status[index - 1]['createdAt'] && stepDate[index - 1]
                            ? status[index - 1]['createdAt'].substring(0, 10)
                            : ''
                        }
                      />
                    </FormControl>
                  ) : (
                    <Typography></Typography>
                  )}
                </Stack>
              </StepButton>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
};

export default OrderSteps;
