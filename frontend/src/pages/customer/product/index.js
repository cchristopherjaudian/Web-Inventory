import MainCard from "components/MainCard";

import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { styled } from '@mui/system';
import { IconButton, Button, Box, Chip, Typography, Card, CardMedia, CardContent, Grid } from '@mui/material';
import { setCart } from "store/reducers/cart";
import { useSelector, useDispatch } from "react-redux";
import useAxios from "hooks/useAxios";
import useAxiosBackup from "hooks/useAxiosBackup";
import RelatedProducts from "./related";
import Info from "./info";
const Product = () => {
    let { id } = useParams();
    const dispatch = useDispatch();
    const [selectedProduct, setSelectedProduct] = useState({});
    const [itemInfo, setItemInfo] = useState({});
    const [cartItem, setCartItem] = useState({});
    const cartItems = useSelector((state) => state.cart.cart);
    const { data, fetchData } = useAxios('products/' + id, 'GET');
    const { profile, fetchProfile } = useAxiosBackup('carts', 'POST', selectedProduct);
    useEffect(() => {
        if (id) {
            fetchData();
        }

    }, [id]);
    useEffect(() => {
        if (data) {
            setItemInfo(data['data']);
        }
    }, [data]);
    useEffect(() => {
        if (Object.keys(cartItem).length !== 0) {
            const newSelectedProduct = { code: cartItem['code'], quantity: 1 };
            setSelectedProduct(newSelectedProduct);
        }
    }, [cartItem]);
    useEffect(() => {
        if (Object.keys(cartItem).length !== 0) {
            fetchProfile(selectedProduct);
        }
    }, [selectedProduct]);
    useEffect(() => {
        if (profile) {
            if (profile['status'] === 200) {

                let newCart = [...cartItems];
                const dispatchProduct = { ...profile['data'], inventory: { products: cartItem } };
                let objectIndex = cartItems.findIndex(item => item.inventory.products.code === cartItem.code);
                if (objectIndex === -1) {
                    newCart.push(dispatchProduct);
                } else {
                    newCart[objectIndex] = dispatchProduct;
                }
                console.log(newCart);
                dispatch(setCart(newCart));
                setSelectedProduct({});
                setCartItem({});
            }
        }
    }, [profile]);
    const Input = styled('input')({
        display: 'none',
    });
    const handleCart = (item) => {
        let newItem = { id: item, name: 'test', qty: 1 };
        dispatch(setCart(newItem));
    }


    return (
        <MainCard>
            <Grid container spacing={1}>
                <Grid item xs={12} md={9}>
                    <Info itemInfo={itemInfo} setCartItem={setCartItem} cartItems={cartItems} productId={id} />
                    <Card mt={2} sx={{ width: '100%', display: 'flex', padding: 2 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h3" color="#2980b9">Product Information</Typography>
                            <Typography variant="body1" mt={1}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae sem a tortor luctus molestie at nec nunc. Mauris scelerisque laoreet purus at malesuada. Sed eleifend tincidunt lobortis. Phasellus et quam facilisis neque suscipit iaculis. Vivamus tempus dui vitae lobortis tincidunt. Pellentesque dictum massa sit amet felis vehicula, nec mattis massa facilisis. Cras quis orci vel tortor elementum sagittis. Aliquam tempor augue vel purus iaculis, posuere ultricies augue laoreet. Donec convallis nisi elit, tristique molestie dui rhoncus eu. Mauris sagittis nec risus at feugiat. Integer pulvinar nunc non nisl semper, pulvinar posuere risus molestie. Suspendisse potenti. Fusce efficitur rutrum felis vitae pharetra. Curabitur vulputate lectus sit amet posuere lobortis.
                            </Typography>
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3} sx={{ height: '80vh', overflowY: 'auto' }}>
                    <Typography variant="h5" color="#2980b9" mb={2}>Related Products</Typography>
                    <RelatedProducts />
                    <RelatedProducts />
                    <RelatedProducts />
                    <RelatedProducts />
                </Grid>

            </Grid>
        </MainCard >
    );
}

export default Product;