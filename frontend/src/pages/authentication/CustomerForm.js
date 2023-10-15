import MainCard from 'components/MainCard';

import { useFormik } from 'formik';
import useAxios from 'hooks/useAxios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
    Button,
    Box,
    Grid,
    TextField
} from '@mui/material'

const CustomerForm = (props) => {
    const navigate = useNavigate();
    const [payload, setPayload] = useState({});
    
    const formik = useFormik({
        initialValues: {
            firstname: '',
            middlename: '',
            lastname: '',
            address: ''
        },
        onSubmit: values => {
            console.log("Submit Formik")
            let newPayload = {...values,account:{accountType: props.activeStep === 0 ? 'CUSTOMER' : 'BUSINESS'}};
            props.setPayload(newPayload);
        },
    });
    
    return (<Grid item xs={12} sx={{ mt: 2 }}>
        <Grid direction="column" container >
            <Grid item xs={12} style={{ display: 'flex', flex: 1 }}>
                <MainCard title="Account Details" sx={{ width: '100%' }}>
                    <Box component="form" noValidate sx={{ height: '100%' }} onSubmit={formik.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <TextField
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
                            <Grid item xs={12} >
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
                            <Grid item xs={12} >
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
                                    id="address"
                                    label="Address"
                                    name="address"
                                    autoComplete="address"
                                    onChange={formik.handleChange}
                                    value={formik.values.address}
                                />
                            </Grid>
                        </Grid>
                        <Box sx={{ mb: 2, mt: 2 }}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                            >
                                Register
                            </Button>
                        </Box>
                    </Box>


                </MainCard>
            </Grid>
        </Grid>
    </Grid>);
}

export default CustomerForm;