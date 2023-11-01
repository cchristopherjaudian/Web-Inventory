import MainCard from 'components/MainCard';
import Header from './header';
import {
    Grid,
    TextField,
    Box,
    Typography
} from '@mui/material';
import Cart from './cart';
const Purchase = () => {
    return (<MainCard sx={{pt:3}}>
        <Header/>
        <Typography variant="h6" sx={{mt:3}}>Enter the item you wish to order</Typography>
        <Cart/>
    </MainCard> );
}
 
export default Purchase;