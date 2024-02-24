import logo from 'assets/images/oxiaire.png';
import basket from 'assets/images/basket.png';
import firebaseConfig from 'config/firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Button, Grid, Typography, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
const Payment = (props) => {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [paymentUrl, setPaymentUrl] = useState('');
  const handleImageChange = (e) => {
    let file = e.target.files[0];
    if (file.size >= 2 * 1024 * 1024) {
      Swal.fire({
        title: 'Delivery Receipt',
        text: 'File size must be 2mb or less',
        icon: 'error'
      });
      return;
    }
    setImage(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    firebase.initializeApp(firebaseConfig);
    const storage = getStorage();
    const storageRef = ref(storage, 'delivery/' + props.id + Date.now() + '.jpg');
    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        setPaymentUrl(downloadURL);
      });
    });
  };
  return (
    <Grid container>

      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        <img src={basket} alt='oxiDelivery' width={300} height={300} />
      </Grid>

      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant="body2" mt={3}>
          Add a picture by browsing from your device atleast 2mb or less
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        {image && <img src={image} alt="preview" width={200} height={200} />}
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        <input accept="image/*" style={{ display: 'none' }} id="contained-button-file" type="file" onChange={handleImageChange} />
        <label htmlFor="contained-button-file">
          <Button variant="contained" component="span" color="info">
            Browse Image
          </Button>
        </label>
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <Typography variant="body2" mt={3}>
          By providing a picture and giving us confirmation of the product&apos;s arrival
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button fullWidth variant="contained" onClick={() => props.setConfirmPayload({
          id: props.id,
          paymentUrl: paymentUrl
        })}>
          Confirm Delivery
        </Button>
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        <img src={logo} width={200} height={150} alt='oxiLogo' />
      </Grid>
      <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>

      </Grid>
      <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button fullWidth variant="contained" color="success" onClick={() => props.setShowQR(false)}>
          Cancel
        </Button>
      </Grid>
      <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>

      </Grid>
    </Grid>
  );
};

export default Payment;
