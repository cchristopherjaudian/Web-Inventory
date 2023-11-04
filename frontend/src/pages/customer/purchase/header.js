import { LoadingOutlined } from '@ant-design/icons';
import {
    Button,
    Grid,
    TextField,
    Box,
    Typography
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Header = (props) => {
    const navigate = useNavigate();
    const profile = useSelector((state)=>state.profile);
  
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
                                value = {profile.firstName.firstName}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                name="dateRequested"
                                onFocus={(e) => e.currentTarget.type = 'date'}
                                onBlur={(e) => e.currentTarget.value === '' && (e.currentTarget.type = 'text')}
                                value = {props.dateRequested}
                                onChange = {(e)=>props.setDateRequested(e.target.value)}
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
                                value = {profile.contact.contact}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                name="dateRequired"
                                value = {props.dateRequired}
                                onChange = {(e)=>props.setDateRequired(e.target.value)}
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
                                value = {profile.emailAddress.emailAddress}
                                label="Email Address"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="address"
                                value = {profile.address.address}
                                fullWidth
                                id="address"
                                label="Address"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button 
                            color = {props.highLoading ? 'warning' : 'primary'}
                            endIcon={props.highLoading ? <LoadingOutlined /> : null}
                            variant="contained" 
                            onClick={() => props.createPO()} 
                            >Create Purchase Request</Button>
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