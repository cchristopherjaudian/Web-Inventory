import {
  Button,
  Divider,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@mui/material';
import CustomTextField from './CustomTextField';
import { removeItem } from 'store/reducers/cart';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setCart } from 'store/reducers/cart';
import useAxios from 'hooks/useAxios';
import useHighAxios
  from 'hooks/useHighAxios';
const CartItemList = (props) => {
  const dispatch = useDispatch();
  const reduxcart = useSelector((state) => state.cart.cart);
  const [cartID, setCartID] = useState('');
  const [cartPayload, setCartPayload] = useState({});
  const [cartCode, setCartCode] = useState('');
  const { data, fetchData } = useAxios('carts/' + cartID, 'DELETE');
  const { highData, highFetchData } = useHighAxios('carts/' + props.cartReduxId, 'PATCH', cartPayload);
  let quantity = Number(props.item.quantity);
  let subprice = Number(props.item.products.price);
  const [price, setPrice] = useState(quantity * subprice);

  useEffect(() => {
    if (cartID) {
      fetchData();
    }
  }, [cartID]);
  useEffect(() => {
    if (Object.keys(cartPayload).length > 0) {
      highFetchData();

      let newCart = [...reduxcart];
      let objectIndex = reduxcart.findIndex((item) => item.products.code === cartCode);
      if (objectIndex !== -1) {
        const updatedCartObject = { ...newCart[objectIndex], quantity: Number(cartPayload.quantity) };
        newCart[objectIndex] = updatedCartObject;
      }
      dispatch(setCart(newCart));
      setCartCode('');
      setCartPayload({});
    }
  }, [cartPayload])
  useEffect(() => {
    if (data) {
      if (data['status'] === 200) {
        dispatch(removeItem(cartID));
        setCartID('');
      }
    }
  }, [data]);
  return (
    <>
      <ListItemButton>
        <ListItemAvatar>
          <img
            width={100}
            height={100}
            src={props.item.products.photoUrl ? props.item.products.photoUrl : 'https://placehold.co/100'}
            alt={props.item.products.name}
          />
        </ListItemAvatar>
        <ListItemText
          sx={{ ml: 2 }}
          primary={
            <Typography variant="h6">
              <Typography component="span" variant="subtitle1">
                {props.item.products.name}
              </Typography>{' '}
            </Typography>
          }
        />
        <ListItemText sx={{ width: '5rem' }}>
          <CustomTextField initialValue={props.item.quantity} onChange={(value) => {
            setCartCode(props.item.products.code);
            setCartPayload({
              quantity: value
            });
            setPrice(subprice * value);
          }} />
        </ListItemText>

        <ListItemText sx={{ display: 'flex', justifyContent: 'flex-end' }} secondary={'₱' + price} />
        <Button variant="contained" color="error" size="small" sx={{ ml: 2 }} onClick={() => setCartID(props.item.id)}>
          Remove
        </Button>
      </ListItemButton>

      <Divider />
    </>
  );
};

export default CartItemList;
