import MainCard from 'components/MainCard';
import {
    Box,
    Button,
    Grid,
    TextField,
    Typography
} from '@mui/material';
import { styled } from '@mui/system';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import useAxios from 'hooks/useAxios';

const InventoryForm = (props) => {
    const [payload, setPayload] = useState({});
    const [productId, setProductId] = useState('');
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
            props.fetchData();
            formik.resetForm();
        }
    }, [data]);
    useEffect(() => {
        setPayload({ ...formik.values, productId: props.productId });
    }, [formik.values]);

    return (<Grid item xs={12}>
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
                        fullWidth
                        variant="contained"
                    >
                        Submit
                    </Button>
                    <Button
                        sx={{ mt: 1 }}
                        type="reset"
                        color="error"
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