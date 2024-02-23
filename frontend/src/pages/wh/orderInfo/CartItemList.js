import {
    Divider,
    ListItemButton,
    ListItemAvatar,
    ListItemText,
    Typography
} from '@mui/material';


const CartItemList = ({product}) => {
    const price = Number(product.products.price);
    const qty = product.quantity;
    let total = price * qty;
    return (<>
        <ListItemButton>
            <ListItemAvatar>
                <img width={100} height={100} src={product.products.photoUrl ? product.products?.photoUrl : 'https://placehold.co/100'} alt={product.products.name} />
            </ListItemAvatar>
            <ListItemText
                sx={{ ml: 2 }}
                primary={
                    <Typography variant="h6">
                        <Typography component="span" variant="subtitle1">
                            {product.products.name}
                        </Typography>{' '}
                    </Typography>
                }
                secondary={'x' + product.quantity}

            />

            <ListItemText
                sx={{ display: 'flex', justifyContent: 'flex-end' }}
                secondary={'₱ ' + total}
            />
         
        </ListItemButton>

        <Divider />
    </>);
}

export default CartItemList;