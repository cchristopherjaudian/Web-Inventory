import {
  Avatar,
  Button,
  CssBaseline,
  FormControl,
  MenuItem,
  InputLabel,
  TextField,
  Snackbar,
  IconButton,
  Grid,
  Box,
  Typography,
  Select,
  Container
} from '@mui/material';
import firebaseConfig from 'config/firebase';
import firebase from 'firebase/compat/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MuiAlert from '@mui/material/Alert';

import { useState, useEffect, forwardRef } from 'react';
import { useFormik } from 'formik';

import Swal from 'sweetalert2';
import useAxios from 'hooks/useAxios';
import { Link, useNavigate } from 'react-router-dom';
const AccountRegister = () => {
  const msgTitle = 'Account Registration';
  const navigate = useNavigate();
  const [payload, setPayload] = useState({});
  const { data, error, fetchData } = useAxios('profiles/full', 'POST', payload);
  const defaultTheme = createTheme();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const [rawFile, setRawFile] = useState(null);
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert sx={{ color: 'white' }} elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: '',
      middlename: '',
      lastname: '',
      address: '',
      emailAddress: '',
      contact: '',
      password: '',
      accountType: '',
      photoUrl: ''
    },
    onSubmit: (values) => {
      if (!checkString(values.password)) {
        Swal.fire({
          icon: 'error',
          title: 'Account Registration',
          html: '<p>Failed to register account. Please check if the password meets these criterias:</p><p>1. Atleast 8 characters</p><p>2. Contains atleast 1 uppercase letter</p><p>3. Contains atleast 1 lowercase letter</p><p>4. Contains atleast 1 special character</p>'
        });
        return;
      }
      const newPayload = {
        ...values, account: {
          username: values.contact,
          password: values.password,
          accountType: values.accountType
        }
      };
      delete newPayload.contact;
      delete newPayload.password;
      delete newPayload.accountType;
      setPayload(newPayload);
    }
  });

  const getUploadValue = (e) => {
    let file = e.target.files[0];
    const fileType = file.name.split('.').pop();
    if (file.size >= 2 * 1024 * 1024) {
      Swal.fire({
        title: 'Profile Photo',
        text: 'File size must be 2mb or less.',
        icon: 'error'
      });
      return;
    }

    if (!['jpg', 'png', 'jpeg'].includes(fileType.toLowerCase())) {
      Swal.fire({
        title: 'Profile Photo',
        text: 'Please upload a valid image file.',
        icon: 'error'
      });
      return;
    }

    setRawFile(file);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (data) {
      const resStatus = data['status'];
      if (resStatus === 200) {
        Swal.fire({
          title: msgTitle,
          text: "Account registered successfully. Click OK to continue",
          icon: "success",
          showCancelButton: false,
          confirmButtonText: "OK"
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/account');
          }
        });

      } else if (resStatus === 409 || resStatus === 400) {
        Swal.fire({
          icon: 'error',
          title: msgTitle,
          text: 'Failed to register account.' + resStatus === 409 ? 'Either contact number or email already exists' : 'Please validate all fields'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: msgTitle,
          text: 'Internal server error. Please try again'
        });
      }
    }
  }, [data]);

  useEffect(() => {
    if (Object.keys(payload).length > 0) {
      fetchData();
    }
  }, [payload])
  useEffect(() => {
    if (!rawFile) return;

    firebase.initializeApp(firebaseConfig);
    const storage = getStorage();
    const storageRef = ref(storage, 'profile/' + Date.now() + '.jpg');
    uploadBytes(storageRef, rawFile).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        formik.setFieldValue('photoUrl', downloadURL);
      });
    });
  }, [rawFile]);
  useEffect(() => {
    if (error) {
      let msg = '';
      let errStatus = error['response']['status'];
      if (errStatus === 400 || errStatus === 409) {
        msg = 'Failed to register account.' + errStatus === 400 ? 'Please validate all fields.' : 'Either contact or email address already exists';
      } else {
        msg = 'Failed to communicate with server. Please try again.';
      }

      Swal.fire(msgTitle, msg, 'warning');
    }
  }, [error]);
  function checkString(str) {
    const lengthCheck = str.length > 7;
    const uppercaseCheck = /[A-Z]/.test(str);
    const numericCheck = /[0-9]/.test(str);
    const specialCheck = /[!@#$%^&*(),.?":{}|<>]/.test(str);
    return lengthCheck && uppercaseCheck && numericCheck && specialCheck;
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >

          <Typography component="h1" variant="h5">
            Register New Admin
          </Typography>

          <label
            htmlFor="icon-button-file"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
          >
            <Avatar
              src={`${formik.values.photoUrl ? formik.values.photoUrl : '/images/example.jpg'}`}
              style={{
                margin: '10px',
                width: '120px',
                height: '120px'
              }}
            />
            <input style={{ display: 'none' }} onChange={getUploadValue} accept="image/*" id="icon-button-file" type="file" />
            <Typography variant="caption">Click here to browse for image</Typography>
          </label>

          <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography>Personal Information</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstname"
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  onChange={formik.handleChange}
                  value={formik.values.firstname}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="middle-name"
                  name="middlename"
                  required
                  fullWidth
                  id="middlename"
                  label="Middle Name"
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
                  autoComplete="family-name"
                  onChange={formik.handleChange}
                  value={formik.values.lastname}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="address"
                  label="Address"
                  id="address"
                  autoComplete="address"
                  onChange={formik.handleChange}
                  value={formik.values.address}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="email-address"
                  name="emailAddress"
                  required
                  fullWidth
                  id="emailAddress"
                  label="Email Address"
                  onChange={formik.handleChange}
                  value={formik.values.emailAddress}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography>Account Information</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="contact"
                  name="contact"
                  required
                  fullWidth
                  id="contact"
                  label="Contact Number"
                  onChange={formik.handleChange}
                  value={formik.values.contact}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="password"
                  name="password"
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ minWidth: 120 }} fullWidth>
                  <InputLabel id="select-account-label">Account Type</InputLabel>
                  <Select
                    labelId="select-account-label"
                    id="accountType"
                    name="accountType"
                    value={formik.values.accountType}
                    label="Account Type"
                    onChange={formik.handleChange}
                    fullWidth
                  >
                    <MenuItem value="">
                      <em>Please select an account type</em>
                    </MenuItem>
                    <MenuItem value="SUB_1" >Sub Admin 1</MenuItem>
                    <MenuItem value="SUB_2">Sub Admin 2</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Register
            </Button>
            <Button component={Link} to="/account" fullWidth variant="outlined" sx={{ mb: 2 }}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default AccountRegister;
