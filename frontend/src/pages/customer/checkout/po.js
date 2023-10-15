import { useSelector } from 'react-redux';
import {
    Grid,
    TextField,
} from '@mui/material';


const PO = (props) => {
    const profile = useSelector((state) => state.profile);
    let currentDate = new Date();
    let newDate = new Date();
    newDate.setDate(currentDate.getDate() + 30);

    
    return <Grid container spacing={1}>
        <Grid item xs={12} >
            <TextField
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                value={profile ? profile.firstName.firstName + ' ' + profile.middleName.middleName + ' ' + profile.lastName.lastName : ''}
                disabled
            />
        </Grid>
        <Grid item xs={12} >
            <TextField
                required
                fullWidth
                id="dateRequested"
                label="Date Requested"
                name="dateRequested"
                value={new Date().toLocaleDateString('en-CA')}
                disabled
            />
        </Grid>
        <Grid item xs={12} >
            <TextField
                required
                fullWidth
                id="datePayment"
                label="Payment Due Date"
                name="datePayment"
                value={newDate.toLocaleDateString('en-CA')}
                disabled
            />
        </Grid>
        <Grid item xs={12}>
            <TextField
                required
                fullWidth
                id="address"
                label="Address"
                name="address"
                value={profile ? profile.address.address : ''}
                disabled
            />
        </Grid>
    </Grid>
        ;
}

export default PO;