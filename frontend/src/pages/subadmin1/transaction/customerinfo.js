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
                    <Grid item xs={12} md={9}>
                        <TextField
                            name="customerName"
                            fullWidth
                            id="customerName"
                            label="Customer Name"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            name="IDNo"
                            fullWidth
                            id="IDNo"
                            label="ID No"

                        />
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <TextField
                            name="address"
                            fullWidth
                            id="address"
                            label="Address"

                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            name="contact"
                            fullWidth
                            id="contact"
                            label="Contact Person"

                        />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <TextField
                            name="periodfrom"
                            fullWidth
                            id="periodfrom"
                            label="Period Cover"

                        />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <TextField
                            name="periodto"
                            fullWidth
                            id="periodto"
                            label="To"
                        />
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Stack direction="row" justifyContent="end" spacing={1}>
                            <FormControlLabel control={<Checkbox />} label="View all records" />
                            <Button variant="contained" size="small">Load Records</Button>
                            <Button variant="contained" size="small">Delete Invoice</Button>
                            <Button variant="contained" size="small">Unbilled</Button>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <TextField
                            name="productName"
                            fullWidth
                            id="productName"
                            label="Product Name"
                        />
                    </Grid>
                    <Grid item xs={12} md={1}>
                        <TextField
                            name=""
                            fullWidth
                            id=""
                            label=""
                        />
                    </Grid>
                </Grid>
            </Box>
        </MainCard>
    );
}

export default CustomerInfo;