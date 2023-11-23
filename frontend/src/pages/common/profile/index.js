import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Snackbar,
  IconButton,
  Grid,
  Box,
  Typography,
  CloudUploadIcon,
  Container
} from '@mui/material';
import firebaseConfig from 'config/firebase';
import firebase from 'firebase/compat/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MuiAlert from '@mui/material/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, forwardRef } from 'react';
import { useFormik } from 'formik';
import { setFirstName, setMiddleName, setLastName, setAddress, setEmailAddress, setPhotoUrl } from 'store/reducers/profile';
import Swal from 'sweetalert2';
import useAxios from 'hooks/useAxios';
const Profile = () => {
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({});
  const { data, error, fetchData } = useAxios('profiles/auth', 'PATCH', payload);
  const defaultTheme = createTheme();
  const userAccount = useSelector((state) => state.profile);

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
      firstname: userAccount.firstName.firstName,
      middlename: userAccount.middleName.middleName ?? '',
      lastname: userAccount.lastName.lastName,
      address: userAccount.address.address,
      emailAddress: userAccount.emailAddress.emailAddress,
      photoUrl: userAccount.photoUrl.photoUrl
    },
    onSubmit: (values) => {
      fetchData();
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
      if (data['status'] === 200) {
        dispatch(setFirstName({ firstName: data['data']['firstname'] }));
        dispatch(setMiddleName({ middleName: data['data']['middlename'] }));
        dispatch(setLastName({ lastName: data['data']['lastname'] }));
        dispatch(setAddress({ address: data['data']['address'] }));
        dispatch(setEmailAddress({ emailAddress: data['data']['emailAddress'] }));
        dispatch(setPhotoUrl({ photoUrl: data['data']['photoUrl'] }));

        setSeverity('success');
        setMessage('Account updated successfully');
        setOpen(true);
      }
    }
  }, [data]);
  useEffect(() => {
    const newPayload = { ...formik.values };
    Object.keys(newPayload).forEach((k) => {
      if (!newPayload[k] || (k === 'emailAddress' && newPayload[k] === userAccount.emailAddress.emailAddress)) {
        delete newPayload[k];
      }
    });
    setPayload(newPayload);
  }, [formik.values]);

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
      if (error['response']['status'] === 400) {
        msg = 'Failed to update profile. Please validate all fields.';
      } else {
        msg = 'Failed to communicate with server. Please try again.';
      }

      Swal.fire('My Profile', msg, 'warning');
    }
  }, [error]);

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
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar> */}
          <Typography component="h1" variant="h5">
            My Profile
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
            <input onChange={getUploadValue} accept="image/*" id="icon-button-file" type="file" />
          </label>

          <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
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
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Update Profile
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Profile;
