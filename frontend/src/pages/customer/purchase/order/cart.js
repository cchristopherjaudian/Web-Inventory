import {
    Grid,
    TextField,
    Box,
    Typography
} from '@mui/material';
import CartItemList from './CartItemList';

const Cart = (props) => {
    const sampleCart = props.prInfo.list;
    return (<Grid container sx={{mt:2}}>
        <Grid item xs={12}>
            {sampleCart?.map((s, i) => {
                return <CartItemList key={s.id} product={s} />
            })
            }
        </Grid>
    </Grid>);
}

export default Cart; 