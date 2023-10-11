import MainCard from 'components/MainCard';
import { ArrowRightOutlined, LoadingOutlined } from '@ant-design/icons';
import {
    Box,
    Button,
    Grid,
    TextField,
    Snackbar
} from '@mui/material';
import { styled } from '@mui/system';
import { useState, useEffect, forwardRef } from 'react';
import { useFormik } from 'formik';
import MuiAlert from '@mui/material/Alert';
import useAxios from 'hooks/useAxios';
const ProductForm = (props) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');
    const [selectedImage, setSelectedImage] = useState();
    const [payload, setPayload] = useState({});


    const Input = styled('input')({
        display: 'none',
    });
    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert sx={{ color: 'white' }} elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            setSelectedImage(URL.createObjectURL(img));
        }
    };
    const { data, loading, error, fetchData } = useAxios('products', 'POST', payload, true);
    
    const formik = useFormik({
        initialValues: {
            name: '',
            code: '',
            size: '',
            category: '',
            price: 0,
            content: 0
        },
        onSubmit: values => {
            setPayload(values);
            fetchData();
        },
    });
    useEffect(() => {
        if (data) {
            if (data['status'] === 200) {
                props.updateTable(data['data']);
                setSeverity('success');
                setMessage('Product registered successfully')
                formik.resetForm();
                setOpen(true);
            } 
        }
    }, [data]);
    useEffect(()=>{
        if(error){
            setSeverity('error');
            if(error['response']['status'] === 400){
                setMessage('Failed to register product. Please validate all fields.')
            } else{
                setMessage('Failed to communicate with server. Please try again.')
            }
            setOpen(true);
        }
    },[error]);
    useEffect(() => {
        setPayload(formik.values);
    }, [formik.values]);
    return (<Grid item xs={12} lg={4}>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
        <MainCard title="New Product" sx={{ width: '100%' }}>
            <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: -3, height: '100%' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="code"
                            label="Product Code"
                            name="code"
                            onChange={formik.handleChange}
                            value={formik.values.code}
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="name"
                            required
                            fullWidth
                            id="name"
                            label="Product Name"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="category"
                            label="Category"
                            name="category"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.category}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="price"
                            label="Price"
                            name="price"
                            type="number"
                            onChange={formik.handleChange}
                            value={formik.values.price}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="size"
                            label="Size"
                            name="size"
                            autoComplete="size"
                            onChange={formik.handleChange}
                            value={formik.values.size}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="content"
                            label="Content"
                            name="content"
                            type="number"
                            onChange={formik.handleChange}
                            value={formik.values.content}
                        />
                    </Grid>
                </Grid>
                <Box sx={{ mb: 2, mt: 2 }}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        endIcon={loading ? <LoadingOutlined /> : <ArrowRightOutlined />}
                        disabled={loading}
                    >
                        Submit
                    </Button>
                    <Button
                        sx={{ mt: 1 }}
                        type="reset"
                        color="secondary"
                        fullWidth
                        variant="contained"
                        disabled={loading}
                        onClick={() => formik.resetForm()}
                    >
                        Cancel
                    </Button>
                </Box>
            </Box>


        </MainCard>
    </Grid>);
}

export default ProductForm;