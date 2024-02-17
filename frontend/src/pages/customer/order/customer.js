import { LoadingOutlined } from '@ant-design/icons';
import MainCard from 'components/MainCard';
import { Button, Grid, InputLabel, MenuItem, Select, FormControl, Typography, FormControlLabel, Checkbox } from '@mui/material';
import { useState, useEffect } from 'react';
import Option from 'pages/customer/checkout/option';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Customer = (props) => {
    const profile = useSelector((state) => state.profile);
    const cartItems = props.order['orderItems'];
    const subtotal =
        cartItems && Object.keys(cartItems).length
            ? cartItems.reduce((sum, item) => {
                return sum + item.quantity * parseFloat(item.products.price);
            }, 0)
            : 0;

    console.log(props);
    const [paymethod, setPaymethod] = useState('');

    const methods = [
        {
            id: 2,
            img: '/asset/gcash.png',
            code: 'GCASH',
            name: 'GCash',
            description: 'GCash facilitates digital payments, allowing customers to make transactions using their mobile phones.'
        },
        {
            id: 3,
            img: '/asset/bank.png',
            code: 'BANK_TRANSFER',
            name: 'Bank Transfer',
            description: 'Bank transfer facilitates digital payments, allowing customers to make transactions using their mobile phones.'
        },
        {
            id: 3,
            img: '/asset/cod.png',
            code: 'COD',
            name: 'Cash on Delivery',
            description: 'COD offers customers the convenience of paying in cash upon product delivery'
        },
        {
            id: 3,
            img: 'https://i.ibb.co/71jrpKb/30-days-term.png?fbclid=IwAR3S6jNPGFrLtA4jYGv5cdtlD4zLJbne9-rK1i46OVJIh_cvz_lfuSQa1I8',
            code: 'PAY_LATER',
            name: '30 Days Term',
            description:
                'The primary feature of "30 Days Terms" is the credit period of 30 days. During this time, the buyer is expected to make the payment for the goods or services they have received.'
        }
    ];
    return (<>
        <MainCard>
            <Grid container spacing={1}>
                <Grid item xs={12} sx={{ p: 1, display: 'flex', direction: 'row', justifyContent: 'space-between' }}>
                    <Typography variant="h5">
                        ORDER NO:
                    </Typography>
                    <Typography variant="h5" sx={{ color: '#3498db' }}>
                        {props.order['id']}
                    </Typography>
                </Grid>
                <Grid item xs={3} sx={{ ml: -1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <img src={profile.photoUrl.photoUrl} alt="CustomerDP" width={120} height={120} />
                </Grid>
                <Grid item xs={9} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sx={{ display: 'flex', direction: 'row', justifyContent: 'space-between' }}>
                            <Typography variant="body1">Requester Name</Typography>
                            <Typography variant="body1" sx={{ color: '#3498db' }}>{profile.firstName.firstName}</Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', direction: 'row', justifyContent: 'space-between' }}>
                            <Typography variant="body1">Email Address</Typography>
                            <Typography variant="body1" sx={{ color: '#3498db' }}>{profile.emailAddress.emailAddress}</Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', direction: 'row', justifyContent: 'space-between' }}>
                            <Typography variant="body1">Address</Typography>
                            <Typography variant="body1" sx={{ color: '#3498db' }}>{profile.address.address}</Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', direction: 'row', justifyContent: 'space-between' }}>
                            <Typography variant="body1">Contact Number</Typography>
                            <Typography variant="body1" sx={{ color: '#3498db' }}>{profile.contact.contact}</Typography>
                        </Grid>
                    </Grid>
                </Grid>





            </Grid>
        </MainCard>
        <MainCard>
            <Grid container spacing={1}>
                <Grid item xs={12} sx={{ display: 'flex', direction: 'row', justifyContent: 'space-between' }}>
                    <Typography variant="body1">Subtotal</Typography>
                    <Typography variant="body1">₱{subtotal}</Typography>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', direction: 'row', justifyContent: 'space-between' }}>
                    <Typography variant="body1">Payment Method</Typography>
                    <Typography variant="body1">{props.order['paymentMethod']}</Typography>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', direction: 'row', justifyContent: 'space-between', mt: 2 }}>
                    <Typography variant="h4">Total</Typography>
                    <Typography variant="h4">₱{subtotal}</Typography>
                </Grid>
            </Grid>
        </MainCard>
    </>
    );
}

export default Customer;