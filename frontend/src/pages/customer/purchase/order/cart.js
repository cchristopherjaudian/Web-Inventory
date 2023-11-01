import {
    Grid,
    TextField,
    Box,
    Typography
} from '@mui/material';
import CartItemList from './CartItemList';

const Cart = () => {
    const sampleCart = [
        { id: 0, name: 'Eyyyy' },
        { id: 1, name: 'Eyyyy' },
        { id: 2, name: 'Eyyyy' },
        { id: 3, name: 'Eyyyy' }
    ]
    return (<Grid container sx={{mt:2}}>
        <Grid item xs={12}>
            {sampleCart.map((s, i) => {
                return <CartItemList key={s.id} />
            })
            }
        </Grid>
    </Grid>);
}

export default Cart; 