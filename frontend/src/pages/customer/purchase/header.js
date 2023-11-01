
import {
    Button,
    Grid,
    TextField,
    Box,
    Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
const Header = () => {
    const navigate = useNavigate();
    return (
        <Box>
            <Grid container spacing={1.5}>
                <Grid item xs={12}>
                    <Typography variant="h2" align="center">Purchase Order Request Form</Typography>
                    <Typography variant="h5" align="center">Enter your company information</Typography>
                </Grid>
                <Grid item xs={8} sx={{ mt: 3 }}>
                    <Grid container spacing={1.5}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                name="name"
                                fullWidth
                                id="name"
                                label="Name"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                name="dateRequested"
                                onFocus={(e) => e.currentTarget.type = 'date'}
                                onBlur={(e) => e.currentTarget.value === '' && (e.currentTarget.type = 'text')}
                                fullWidth
                                id="dateRequested"
                                label="Date Requested"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                name="phoneNumber"
                                fullWidth
                                id="phoneNumber"
                                label="Phone Number"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                name="dateRequired"
                                onFocus={(e) => e.currentTarget.type = 'date'}
                                onBlur={(e) => e.currentTarget.value === '' && (e.currentTarget.type = 'text')}
                                fullWidth
                                id="dateRequired"
                                label="Date Required"
                                
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 3 }}>
                            <TextField
                                name="email"
                                fullWidth
                                id="email"
                                label="Email Address"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="address"
                                fullWidth
                                id="address"
                                label="Address"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button variant="contained" onClick={() => navigate('/purchase/quotation/1')} >Create Purchase Request</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <Grid container spacing={1.5}>

                    </Grid>
                </Grid>

            </Grid>
        </Box>
    );
}

export default Header;