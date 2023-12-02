import MainCard from 'components/MainCard';
import * as Yup from 'yup';
import axios, { AxiosError } from 'axios';
import { useFormik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button, Box, Grid, TextField, Typography, InputAdornment, IconButton, Checkbox, FormControlLabel } from '@mui/material';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';

const profileClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || '',
  timeout: 10000
});

const profileSchema = Yup.object().shape({
  firstname: Yup.string().required('Firstname is a required field'),
  middlename: Yup.string().optional(),
  lastname: Yup.string().required('Lastname is a required field'),
  address: Yup.string().required('Address is a required field'),
  email: Yup.string().email('Please enter a valid email').required('Email is a required field'),
  contact: Yup.string().min(11).max(11).trim().required('Contact is a required field'),
  password: Yup.string()
    .matches(/^[A-Z]/, 'Password should start with a capital letter')
    .matches(/(?=.*\d)/, 'Password should contain atleast contain 1 numeric value')
    .matches(/(?=.*[@#$!%*?&])/, 'Password should atleast contain 1 special character')
    .matches(/[A-Za-z\d@$!%*?&]{7,}/, 'Password should be 8 characters length')
    .trim()
    .required('Password is a required field')
});

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
    onSubmit: async (values) => {
      try {
        if (!approved) {
          console.log('T&C is not checked');
          return;
        }
        const validated = await profileSchema.validate(values);

        // validates if email and contact already exists
        await profileClient.get(`/profiles/check?email=${validated.email}&username=${validated.contact}`);

        const newPayload = {
          ...validated,
          account: { accountType: props.activeStep === 0 ? 'CUSTOMER' : 'BUSINESS' }
        };
        Object.keys(newPayload).forEach((k) => {
          if (!newPayload[k]) delete newPayload[k];
        });
        localStorage.setItem('signUpData', JSON.stringify(newPayload));
        navigate('/verification', { replace: true });
      } catch (error) {
        let errorMessage = error?.message;

        if (error instanceof AxiosError) {
          errorMessage = error.response?.data?.data.message;
        }

        await Swal.fire({
          icon: 'error',
          title: 'Account Registration',
          text: errorMessage,
          allowOutsideClick: false,
          showCancelButton: false,
          confirmButtonText: 'Ok'
        });
      }
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
                  <FormControlLabel control={<Checkbox checked={approved} onChange={() => setApprove(() => !approved)} name="jason" />} />I
                  agree to the <Link to="/legal">terms and conditions and privacy policy</Link> as set out by the user agreement
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
