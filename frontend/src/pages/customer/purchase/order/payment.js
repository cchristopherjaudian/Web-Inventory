import firebaseConfig from 'config/firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
    Button,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    FormControl,
    Typography
} from '@mui/material';
import { useState, useEffect } from 'react';
const Payment = (props) => {
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);
    const handleImageChange = (e) => {
        let file = e.target.files[0];
        if (file.size >= 2 * 1024 * 1024) {
            Swal.fire({
                title:'Upload Payment',
                text:'File size must be 2mb or less',
                icon:'error'
            })
            return;
        }
        setImage(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
        firebase.initializeApp(firebaseConfig);
        const storage = getStorage();
        const storageRef = ref(storage, 'payment/' + props.id + Date.now() + '.jpg');
        uploadBytes(storageRef, file).then((snapshot) => {
            getDownloadURL(snapshot.ref)
                .then((downloadURL) => {
                    console.log(downloadURL);
                    props.setPaymentUrl(downloadURL)
                });
        });
    };
    return (<Grid container>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <img src='https://firebasestorage.googleapis.com/v0/b/cf-boilerplate.appspot.com/o/admin%2Fgcash.png?alt=media&token=5b8ee2b3-55d0-4902-b026-9956a9ddfc9b' alt='oxigcash' width={400} height={400} />
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="body2" mt={3}>Add a picture by browsing from your device atleast 2mb or less</Typography>
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            {image && <img src={image} alt="preview" width={200} height={200} />}
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <input
                accept="image/*"
                style={{ display: 'none' }}
                id="contained-button-file"
                type="file"
                onChange={handleImageChange}
            />
            <label htmlFor="contained-button-file">
                <Button variant="contained" component="span" color="info">
                    Browse Image
                </Button>
            </label>
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
            <Typography variant="body2" mt={3}>By providing a picture and giving us confirmation of your payment</Typography>
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button fullWidth variant="outlined" onClick={() => props.setShowQR(false)}>
                Cancel
            </Button>
        </Grid>
    </Grid>);
}

export default Payment;