import { LoadingOutlined } from '@ant-design/icons';
import MainCard from 'components/MainCard';
import { Button, Grid, InputLabel, MenuItem, Select, FormControl, Typography, FormControlLabel, Checkbox } from '@mui/material';
import { useState, useEffect } from 'react';
import Option from 'pages/customer/checkout/option';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const HeadInfo = (props) => {
  const profile = useSelector((state) => state.profile);

  const [paymethod, setPaymethod] = useState('');

  const methods = [
    {
      id: 3,
      img: '/asset/bank.png',
      code: 'BANK_TRANSFER',
      name: 'Bank Transfer',
      description: 'Bank transfer facilitates digital payments, allowing customers to make transactions using their mobile phones.'
    },
    {
      id: 3,
      img: 'https://i.ibb.co/71jrpKb/30-days-term.png?fbclid=IwAR3S6jNPGFrLtA4jYGv5cdtlD4zLJbne9-rK1i46OVJIh_cvz_lfuSQa1I8',
      code: 'PAY_LATER',
      name: '30 Days Term',
      description:
        'The primary feature of "30 Days Terms" is the credit period of 30 days. During this time, the buyer is expected to make the payment for the goods or services they have received.'
    }
  ];
  const handleChange = (event) => {
    props.setPaymethod(event.target.value);
    setPaymethod(event.target.value);
    props.setShowQR(true);
  };

  return (
    <MainCard>
      <Grid container spacing={1}>
        <Grid item xs={6} sx={{ ml: -1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <img src={profile.photoUrl.photoUrl} alt="CustomerDP" width={150} height={150} />
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Typography variant="h5">{props.prInfo.dateRequested?.substring(0, 10)}</Typography>
        </Grid>
        <Grid item xs={12} sx={{ p: 1, display: 'flex', direction: 'row', justifyContent: 'space-between', backgroundColor: '#3498db' }}>
          <Typography variant="h5" sx={{ color: 'white' }}>
            Purchase ID
          </Typography>
          <Typography variant="h5" sx={{ color: 'white' }}>
            {props.prInfo.groupNo}
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', direction: 'row', justifyContent: 'space-between' }}>
          <Typography variant="body1">Requester Name</Typography>
          <Typography variant="body1">{profile.firstName.firstName}</Typography>
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', direction: 'row', justifyContent: 'space-between' }}>
          <Typography variant="body1">Email Address</Typography>
          <Typography variant="body1">{profile.emailAddress.emailAddress}</Typography>
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', direction: 'row', justifyContent: 'space-between' }}>
          <Typography variant="body1">Contact Number</Typography>
          <Typography variant="body1">{profile.contact.contact}</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            mt: 2,
            p: 3,
            display: 'flex',
            direction: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#3498db'
          }}
        >
          <Typography variant="h3" sx={{ color: 'white', mt: 2 }}>
            TOTAL:
          </Typography>
          <Typography variant="h3" sx={{ color: 'white', mt: 2 }}>
            PHP {props.prInfo.totalAmount}
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Typography variant="h5">Payment Method:</Typography>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="payment-method">Payment Method</InputLabel>
            <Select labelId="payment-method" id="payment-method-select" value={paymethod} label="Payment Method" onChange={handleChange}>
              <MenuItem value={'BANK_TRANSFER'}>Bank Transfer</MenuItem>
              <MenuItem value={'PAY_LATER'}>30 Days Term</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          {methods.map((method, index) => {
            return (
              <Grid item xs={12} key={index}>
                <Option name={method.name} description={method.description} img={method.img} />
              </Grid>
            );
          })}
        </Grid>
        <Grid item xs={12} style={{ fontSize: '1rem', textAlign: 'justify' }}>
          <FormControlLabel
            control={<Checkbox checked={props.termsApproved} onChange={() => props.setTermsApproved((val) => !val)} name="jason" />}
            style={{ margin: 0 }}
          />
          By agreeing to our{' '}
          <Link to="/legal" target="_blank">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link to="/legal" target="_blank">
            Privacy Policy
          </Link>
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Button
            color={props.highLoading ? 'warning' : 'primary'}
            endIcon={props.highLoading ? <LoadingOutlined /> : null}
            variant="contained"
            onClick={() => props.proceedCheckout()}
            fullWidth
            disabled={!props.termsApproved}
          >
            Create Purchase Order
          </Button>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default HeadInfo;
