import firebaseConfig from 'config/firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Grid, Button, Typography } from "@mui/material";
import useAxios from 'hooks/useAxios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
const Confirmation = (props) => {
   
    const [file, setFile] = useState(null);
    const [payload, setPayload] = useState({});
    const [image, setImage] = useState(null);
    const { data, fetchData } = useAxios('orders/' + props.id, 'PATCH', payload, true);
    const handleImageChange = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    };
    const uploadPayment = () => {
        if (!image) {
            Swal.fire({
                title: 'Upload Payment',
                text: 'Please select an image to be uploaded',
                icon: 'info'
            })
            return;
        }
        firebase.initializeApp(firebaseConfig);
        const storage = getStorage();
        const storageRef = ref(storage, 'delivery/' + props.id + Date.now() + '.jpg');
        uploadBytes(storageRef, file).then((snapshot) => {
            console.log('Uploaded a blob or file!');
            getDownloadURL(snapshot.ref)
                .then((downloadURL) => {
                    setPayload({ deliveryUrl: downloadURL });
                });
        });
    }
    useEffect(() => {
        if (Object.keys(payload).length !== 0) {
            console.log(payload);
            fetchData();
        }
    }, [payload])
    useEffect(() => {
        if (data) {
            if (data['status'] === 200) {
                Swal.fire({
                    title: 'Payment Confirmation',
                    text: 'Payment uploaded successfully',
                    icon: 'success',
                    allowOutsideClick: false
                })
                props.incrementStep();
            } else {
                Swal.fire({
                    title: 'Payment Confirmation',
                    text: 'Failed to upload payment. Please try again.',
                    icon: 'error',
                    allowOutsideClick: false
                })
            }
        }
    }, [data])
    return (<Grid container spacing={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <img src={props.status.length < 2 ? '/asset/delivery-truck.png' : '/asset/shopping-basket.png'} width={400} height={400} alt="payment" />
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h1">{props.status.length >= 2 ? 'Delivery Completed' : 'Waiting for Delivery'}</Typography>
        </Grid>
        {
            props.status.length >= 2 &&
            <>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="h4" mt={3}>Your order has been delivered to you.</Typography>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="h5">Date Delivered: {props.status[2]?.createdAt?.substring(0, 10)}</Typography>
                </Grid>
            </>
        }
        {
            props.paymentUrl && <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center',mt:2 }}>
                <img src={props.paymentUrl} alt="preview" width={400} height={400} />
            </Grid>
        }

        {
            (props.status.length >= 2 && props.mainStatus !== 'PAID' && !props.paymentUrl) &&
            <>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="h6" mt={3}>Add a picture by browsing from your device</Typography>
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
                    <Typography variant="body2" mt={3}>By providing a picture and giving us confirmation of the product&apos;s arrival</Typography>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" onClick={() => uploadPayment()}>
                        Confirm Delivery
                    </Button>
                </Grid>
            </>
        }
    </Grid>

    )
}

export default Confirmation;