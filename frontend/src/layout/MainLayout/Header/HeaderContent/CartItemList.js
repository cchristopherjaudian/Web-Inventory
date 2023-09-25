import {
    Button,
    Divider,
    ListItemButton,
    ListItemAvatar,
    ListItemText,
    Typography
} from '@mui/material';
import { ShoppingOutlined } from '@ant-design/icons';
import { removeItem } from 'store/reducers/cart';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import useAxios from 'hooks/useAxios';

const CartItemList = (props) => {
    const dispatch = useDispatch();
    const [cartID, setCartID] = useState('');
    const { data, fetchData } = useAxios('carts/' + cartID, 'DELETE');
    const price = (Number(props.item.cartItem.price) * Number(props.item.quantity));
    useEffect(() => {
        if (cartID) {
            fetchData();
        }
    }, [cartID]);
    useEffect(() => {
        if(data){
            if(data['status'] === 200){
                dispatch(removeItem(cartID));
                setCartID('');
            }
        }
    }, [data]);
    return (<>
        <ListItemButton>
            <ListItemAvatar>
                <img src='https://placehold.co/100' alt={props.item.cartItem.name} />
            </ListItemAvatar>
            <ListItemText
                sx={{ ml: 2 }}
                primary={
                    <Typography variant="h6">
                        <Typography component="span" variant="subtitle1">
                            {props.item.cartItem.name}
                        </Typography>{' '}
                    </Typography>
                }
                secondary={'x' + props.item.quantity}

            />
            <ListItemText
                sx={{ display: 'flex', justifyContent: 'flex-end' }}
                secondary={'₱' + price}
            />
            <Button variant="contained" color="error" size="small" sx={{ ml: 2 }} onClick={() => setCartID(props.item.id)}>
                Remove
            </Button>
        </ListItemButton>

        <Divider />
    </>);
}

export default CartItemList;