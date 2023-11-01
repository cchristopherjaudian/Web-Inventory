import {
    Button,
    Divider,
    ListItemButton,
    ListItemAvatar,
    ListItemText,
    OutlinedInput,
    FormControl,
    FormHelperText,
    InputAdornment,
    Typography
} from '@mui/material';
import { ShoppingOutlined } from '@ant-design/icons';
import { removeItem } from 'store/reducers/cart';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import useAxios from 'hooks/useAxios';

const CartItemHeader = (props) => {

    return (<>
        <ListItemButton>
            <ListItemAvatar>
                <img src='' alt="Test" width={100} height={100} />
            </ListItemAvatar>
            <ListItemText
            sx={{ ml: 2 }}
                primary={
                    <Typography variant="h6">
                        <Typography component="span" variant="subtitle1">
                            Product Name
                        </Typography>{' '}
                    </Typography>
                }

            />
            <ListItemText
                sx={{ display: 'flex', justifyContent: 'flex-end' }}
                primary={'Price'}
            />
            <ListItemText
                sx={{ display: 'flex', justifyContent: 'flex-end' }}
                primary={'Quantity'}
            />
            <ListItemText
                sx={{ display: 'flex', justifyContent: 'flex-end' }}
                primary={'₱5555'}
            />

        </ListItemButton>

        <Divider />
    </>);
}

export default CartItemHeader;