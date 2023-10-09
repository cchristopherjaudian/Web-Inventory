import MainCard from 'components/MainCard';
import {
    Stack,
    Button,
    Grid,
    TextField,
    FormControlLabel,
    Checkbox,
    Box
} from '@mui/material';


const CustomerInfo = () => {
    return (
        <MainCard>
            <Box>
                <Grid container spacing={1.5}>
                    <Grid item xs={12} md={4}>
                        <TextField
                            name="lastName"
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            name="firstName"
                            fullWidth
                            id="firstName"
                            label="First Name"

                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            name="middleName"
                            fullWidth
                            id="middleName"
                            label="Middle Name"

                        />
                    </Grid>

                    <Grid item xs={12} sx={{mt:2}}>
                        <Stack direction="row" justifyContent="end" spacing={1}>
                            <FormControlLabel control={<Checkbox />} label="View all records" />
                            <Button variant="contained" size="small">Load Records</Button>
                            <Button variant="contained" size="small">Delete Invoice</Button>
                            <Button variant="contained" size="small">Unbilled</Button>
                        </Stack>
                    </Grid>

                </Grid>
            </Box>
        </MainCard>
    );
}

export default CustomerInfo;