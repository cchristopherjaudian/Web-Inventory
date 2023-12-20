import firebaseConfig from 'config/firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Option from './option';
import { Grid } from '@mui/material';
import { Button, Typography, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const Payment = (props) => {
  const [file, setFile] = useState(null);
  const [payload, setPayload] = useState({});
  const [image, setImage] = useState(null);
  const accType = useSelector((state) => state.profile.accType);
  const [showQR, setShowQR] = useState(false);
  const methods = [
    {
      id: 1,
      img: '/asset/cod.png',
      code: 'COD',
      name: 'Cash on Delivery',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laoreet faucibus fringilla. In tristique at risus ut sagittis. Proin vel congue ante. Fusce ultrices arcu lectus,'
    },
    {
      id: 2,
      img: '/asset/gcash.png',
      code: 'GCASH',
      name: 'GCash',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laoreet faucibus fringilla. In tristique at risus ut sagittis. Proin vel congue ante. Fusce ultrices arcu lectus,'
    },
    {
      id: 3,
      img: '/asset/bank.png',
      code: 'BANK_TRANSFER',
      name: 'Bank Transfer',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laoreet faucibus fringilla. In tristique at risus ut sagittis. Proin vel congue ante. Fusce ultrices arcu lectus,'
    }
  ];
  let payMethods = accType.accType === 'BUSINESS' ? methods.filter((item) => item.code !== 'COD') : methods;

  const handleImageChange = (e) => {
    let file = e.target.files[0];
    if (file.size >= 2 * 1024 * 1024) {
      Swal.fire({
        title: 'Upload Payment',
        text: 'File size must be 2mb or less',
        icon: 'error'
      });
      return;
    }
    setImage(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    firebase.initializeApp(firebaseConfig);
    const storage = getStorage();
    const storageRef = ref(storage, 'payment/' + props.id + Date.now() + '.jpg');
    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        props.setPaymentUrl(downloadURL);
      });
    });
  };

  return (
    <Grid container spacing={1}>
      {!showQR ? (
        payMethods.map((method, index) => {
          return (
            <Grid
              item
              xs={12}
              key={index}
              onClick={() => {
                props.setPayMethod(method.code);
                if (index > 0) setShowQR(true);
              }}
            >
              <Option name={method.name} description={method.description} img={method.img} />
            </Grid>
          );
        })
      ) : (
        <>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <img src="asset/oxi_gcash.png" alt="oxigcash" width={400} height={400} />
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
          {['GCASH', 'BANK_TRANSFER'].includes(props.paymentMethod) && (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <TextField
                sx={{ width: '50%' }}
                required
                type="text"
                id="referenceNo"
                label="Enter reference number."
                name="referenceNo"
                onChange={(e) => props.setReferenceNumber(() => e.target.value)}
                autoFocus
              />
            </Grid>
          )}
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
            <Typography variant="body2" mt={3}>
              By providing a picture and giving us confirmation of your payment
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button fullWidth variant="outlined" onClick={() => setShowQR(false)}>
              Cancel
            </Button>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Payment;
