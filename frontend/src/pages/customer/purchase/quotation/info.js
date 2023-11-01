
import {
    Button,
    Grid,
    TextField,
    Box,
    Typography
} from '@mui/material';

const Info = () => {
    return (
        <Box sx={{ mt: 2 }}>

            <Grid container sx={{ px: 1.5,pb:3 }}>
                <Grid item xs={12} md={6} sx={{ mt: 1 }}>
                    <Typography variant="h3" sx={{ color: 'white', backgroundColor: '#3498db', ml: -2,mb:2,pl:2 }}>OXIAIRE</Typography>
                    <Grid container sx={{ p: 3, backgroundColor: '#D1EAFF' }} spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="oxiOwner"
                                fullWidth
                                id="oxiOwner"
                                label="Owner Name"
                                disabled
                                sx={{ backgroundColor: 'white' }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="oxiCompany"
                                fullWidth
                                id="oxiCompany"
                                label="Company Name"
                                disabled
                                sx={{ backgroundColor: 'white' }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="oxiAddress"
                                fullWidth
                                id="oxiAddress"
                                label="Address"
                                disabled
                                sx={{ backgroundColor: 'white' }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="oxiPhone"
                                fullWidth
                                id="oxiPhone"
                                label="Phone Number"
                                disabled
                                sx={{ backgroundColor: 'white' }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="oxiEmail"
                                fullWidth
                                id="oxiEmail"
                                label="Email Address"
                                disabled
                                sx={{ backgroundColor: 'white' }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6} sx={{ mt: 1 }}>
                <Typography variant="h3" sx={{ color: 'white', backgroundColor: '#3498db', ml:-2,pl: 2,mb:2 }}>OXIAIRE</Typography>
                    <Grid container sx={{ p: 3, backgroundColor: '#D1EAFF' }} spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="customerName"
                                fullWidth
                                id="customerName"
                                label="Customer Name"
                                sx={{ backgroundColor: 'white' }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="customerBusiness"
                                fullWidth
                                id="customerBusiness"
                                label="Company Name"
                                sx={{ backgroundColor: 'white' }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="customerAddress"
                                fullWidth
                                id="customerAddress"
                                label="Address"
                                sx={{ backgroundColor: 'white' }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="customerPhone"
                                fullWidth
                                id="customerPhone"
                                label="Phone Number"
                                sx={{ backgroundColor: 'white' }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="customerEmail"
                                fullWidth
                                id="customerEmail"
                                label="Email Address"
                                sx={{ backgroundColor: 'white' }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Info;