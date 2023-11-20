import MainCard from 'components/MainCard';
import { useFormik } from 'formik';
import useAxios from 'hooks/useAxios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button, Box, Grid, TextField, Typography, InputAdornment, IconButton, Checkbox, FormControlLabel } from '@mui/material';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
const CustomerForm = (props) => {
  const navigate = useNavigate();
  const [approved, setApprove] = useState(false);
  const baseValues = {
    firstname: '',
    middlename: '',
    lastname: '',
    address: '',
    email: '',
    contact: '',
    password: ''
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const initVal = {
    ...(props.activeStep !== 0 && { businessName: '' }),
    ...baseValues
  };

  const formik = useFormik({
    initialValues: initVal,
    onSubmit: (values) => {
      if (!approved) {
        console.log('T&C is not checked');
        return;
      }
      let validInput = true;
      for (let key in values) {
        if (values[key] === '') {
          validInput = false;
          Swal.fire({
            title: 'Account Registration',
            text: 'All fields are required',
            icon: 'info'
          });
          
        }
      }
      if(!validInput) return;
      let newPayload = {
        ...values,
        account: { accountType: props.activeStep === 0 ? 'CUSTOMER' : 'BUSINESS' }
      };
      localStorage.setItem('signUpData', JSON.stringify(newPayload));
      navigate('/verification', { replace: true });
    }
  });

  return (
    <Grid item xs={12} sx={{ mt: 2 }}>
      <Grid direction="column" container>
        <Grid item xs={12} style={{ display: 'flex', flex: 1 }}>
          <MainCard title="Account Details" sx={{ width: '100%' }}>
            <Box component="form" noValidate sx={{ height: '100%' }} onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                {props.activeStep === 1 && (
                  <>
                    <Grid item xs={12}>
                      <Typography variant="body1">Business Information</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="businessName"
                        required
                        fullWidth
                        id="businessName"
                        label="Business Name"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.businessName}
                        autoFocus
                      />
                    </Grid>
                  </>
                )}

                <Grid item xs={12} lg={6}>
                  <TextField
                    name="email"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    name="contact"
                    required
                    fullWidth
                    id="contact"
                    label="Contact"
                    onChange={formik.handleChange}
                    value={formik.values.contact}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="address"
                    label="Address"
                    name="address"
                    autoComplete="address"
                    onChange={formik.handleChange}
                    value={formik.values.address}
                  />
                </Grid>
                {props.activeStep === 1 && (
                  <Grid item xs={12}>
                    <Typography variant="body1">Business Owner&apos;s Information</Typography>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <TextField
                    name="firstname"
                    required
                    fullWidth
                    id="firstname"
                    label="First Name"
                    onChange={formik.handleChange}
                    value={formik.values.firstname}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="middlename"
                    label="Middle Name"
                    name="middlename"
                    onChange={formik.handleChange}
                    value={formik.values.middlename}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="lastname"
                    label="Last Name"
                    name="lastname"
                    onChange={formik.handleChange}
                    value={formik.values.lastname}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end" size="large">
                            {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox checked={approved} onChange={() => setApprove(() => !approved)} name="jason" />}
                    label="I agree to the terms and conditions and privacy policy as set out by the user agreement"
                  />
                </Grid>
              </Grid>
              <Box sx={{ mb: 2, mt: 2 }}>
                <Button type="submit" fullWidth variant="contained" disabled={!approved}>
                  Register
                </Button>
              </Box>
            </Box>
          </MainCard>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CustomerForm;
