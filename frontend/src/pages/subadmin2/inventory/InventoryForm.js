import MainCard from 'components/MainCard';
import { ArrowRightOutlined, LoadingOutlined } from '@ant-design/icons';
import {
    Box,
    Button,
    Grid,
    TextField,
    Snackbar,
    Typography
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { styled } from '@mui/system';
import { useState, useEffect, forwardRef } from 'react';
import { useFormik } from 'formik';
import useAxios from 'hooks/useAxios';

const InventoryForm = (props) => {
    const [message, setMessage] = useState('');
    const [orders, setOrders] = useState([]);
    const [payload, setPayload] = useState({});
    const [productId, setProductId] = useState('');
    const [open, setOpen] = useState(false);
    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert sx={{ color: 'white' }} elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const Input = styled('input')({
        display: 'none',
    });

    const { data, loading, error, fetchData } = useAxios('inventories', 'POST', payload, true);
    const formik = useFormik({
        initialValues: {
            stock: '',
            expiration: ''
        },
        onSubmit: values => {
            fetchData();

        },
    });
    useEffect(() => {
        if (data) {
            if (data['status'] === 200) {
                handleClick();
                setMessage('Product inventory registered successfully');
                props.fetchData();
                formik.resetForm();
            }

        }
    }, [data]);
    useEffect(() => {
        setPayload({ ...formik.values, productId: props.productId });
    }, [formik.values]);

    return (<Grid item xs={12}>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
        <MainCard title="Add Inventory" sx={{ width: '100%' }}>
            <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: -3, height: '100%' }}>
                <Grid container spacing={2}>

                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="expiration"
                            label="Expiration"
                            name="expiration"
                            onChange={formik.handleChange}
                            value={formik.values.expiration}
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="stock"
                            required
                            fullWidth
                            id="stock"
                            label="Quantity"
                            onChange={formik.handleChange}
                            value={formik.values.stock}
                        />
                    </Grid>
                </Grid>
                <Box sx={{ mb: 2, mt: 2 }}>
                    <Button
                        type="submit"
                        disabled={loading}
                        fullWidth
                        variant="contained"
                        endIcon={loading ? <LoadingOutlined /> : <ArrowRightOutlined />}
                    >
                        Submit
                    </Button>
                    <Button
                        disabled={loading}
                        sx={{ mt: 1 }}
                        type="reset"
                        color="secondary"
                        fullWidth
                        variant="contained"
                        onClick={() => formik.resetForm()}
                    >
                        Cancel
                    </Button>
                </Box>
            </Box>


        </MainCard>
    </Grid>);
}

export default InventoryForm;