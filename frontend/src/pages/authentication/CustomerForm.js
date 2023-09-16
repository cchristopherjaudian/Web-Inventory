import MainCard from 'components/MainCard';
import {
    Button,
    Box,
    Grid,
    TextField
} from '@mui/material'

const CustomerForm = () => {
    return (<Grid item xs={12} sx={{mt:2}}>
        <Grid direction="column" container >
            <Grid item xs={12} style={{ display: 'flex', flex: 1 }}>
                <MainCard title="Account Details" sx={{ width: '100%' }}>
                    <Box component="form" noValidate sx={{ height: '100%' }}>
                        <Grid container spacing={2}>
                        <Grid item xs={12}>
                                <TextField
                                    name="email"
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
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
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="contact"
                                    label="Contact"
                                    name="contact"
                                    autoComplete="contact"
                                />
                            </Grid>
                        </Grid>

                    </Box>
                    <Box sx={{ mb: 2, mt: 2 }}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                        >
                            Register
                        </Button>
                    </Box>

                </MainCard>
            </Grid>
        </Grid>
    </Grid>);
}

export default CustomerForm;