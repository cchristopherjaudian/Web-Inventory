import MainCard from "components/MainCard";
import {
    Button,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    FormControl,
    Typography
} from '@mui/material';
import { useState, useEffect } from 'react';
import Option from "pages/customer/checkout/option";
import { useSelector } from 'react-redux';
const HeadInfo = (props) => {
    const profile = useSelector((state) => state.profile);
    const [paymethod, setPaymethod] = useState('');
    const methods = [
        { id: 2, img: '/asset/gcash.png', code: 'GCASH', name: 'GCash', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laoreet faucibus fringilla. In tristique at risus ut sagittis. Proin vel congue ante. Fusce ultrices arcu lectus,' },
        { id: 3, img: '/asset/bank.png', code: 'BANK_TRANSFER', name: 'Bank Transfer', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laoreet faucibus fringilla. In tristique at risus ut sagittis. Proin vel congue ante. Fusce ultrices arcu lectus,' }
    ]
    const handleChange = (event) => {
        setPaymethod(event.target.value);
    };
    return (
        <MainCard>
            <Grid container spacing={1} >
                <Grid item xs={6} sx={{ ml: -1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <img src="https://www.placehold.co/200x100" alt="x" />
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Typography variant="h5">{props.prInfo.dateRequested?.substring(0,10)}</Typography>
                </Grid>
                <Grid item xs={12} sx={{ p: 1, display: 'flex', direction: 'row', justifyContent: 'space-between', backgroundColor: '#3498db' }}>
                    <Typography variant="h5" sx={{ color: 'white' }}>Quote ID</Typography>
                    <Typography variant="h5" sx={{ color: 'white' }}>{props.prInfo.groupNo}</Typography>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', direction: 'row', justifyContent: 'space-between' }}>
                    <Typography variant="body1">Requester Name</Typography>
                    <Typography variant="body1">{profile.firstName.firstName}</Typography>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', direction: 'row', justifyContent: 'space-between' }}>
                    <Typography variant="body1">Email Address</Typography>
                    <Typography variant="body1">{profile.emailAddress.emailAddress}</Typography>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', direction: 'row', justifyContent: 'space-between' }}>
                    <Typography variant="body1">Contact Number</Typography>
                    <Typography variant="body1">{profile.contact.contact}</Typography>
                </Grid>
                <Grid item xs={12} sx={{ mt: 2, p: 3, display: 'flex', direction: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#3498db' }}>
                    <Typography variant="h3" sx={{ color: 'white', mt: 2 }}>TOTAL:</Typography>
                    <Typography variant="h3" sx={{ color: 'white', mt: 2 }}>PHP xx.xx</Typography>
                </Grid>
                <Grid item xs={12} sx={{ mt: 2 }}>
                    <Typography variant="h5">Payment Method:</Typography>
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel id="payment-method">Payment Method</InputLabel>
                        <Select
                            labelId="payment-method"
                            id="payment-method-select"
                            value={paymethod}
                            label="Payment Method"
                            onChange={handleChange}
                        >
                            <MenuItem value={'GCASH'}>GCash</MenuItem>
                            <MenuItem value={'BANK_TRANSFER'}>Bank Transfer</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    {
                        methods.map((method, index) => {
                            return <Grid item xs={12} key={index}>
                                <Option name={method.name} description={method.description} img={method.img} />
                            </Grid>;

                        })
                    }
                </Grid>
                <Grid item xs={12} sx={{mt:2}}>
                    <Button variant="contained" fullWidth>Create Purchase Order</Button>
                </Grid>
            </Grid>
        </MainCard>
    );
}

export default HeadInfo;