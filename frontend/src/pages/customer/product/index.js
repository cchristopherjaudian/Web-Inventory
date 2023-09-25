import MainCard from "components/MainCard";
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { styled } from '@mui/system';
import { IconButton, Button, Box, Chip, Typography, Card, CardMedia, CardContent, Grid } from '@mui/material';
import { setCart } from "store/reducers/cart";
import { useSelector, useDispatch } from "react-redux";
import useAxios from "hooks/useAxios";
import useAxiosBackup from "hooks/useAxiosBackup";
import RelatedProducts from "./related";
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
                const dispatchProduct = { ...profile['data'], cartItem };
                dispatch(setCart(dispatchProduct));
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
                    <Card sx={{ width: '100%', display: 'flex' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardMedia
                                component="img"
                                height="300"
                                image={"https://placehold.co/300"}
                                alt="placeholder"
                            />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Typography gutterBottom variant="h4">
                                        {itemInfo.name}
                                    </Typography>
                                    <Chip label=" 50 lbs" color="error" size="small" />
                                </Box>
                                <Typography variant="body2" color="text.secondary">
                                    200 stocks available
                                </Typography>
                                <Typography mt={3} variant="body1" color="#2980b9">
                                    Price: {itemInfo.price}
                                </Typography>
                                <Grid container spacing={0.2} mt={2}>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" >
                                            Availability
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" color="#2980b9">
                                            In Stock
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" >
                                            Category
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" color="#2980b9">
                                            Medical Oxygen
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" >
                                            Walk in | Deliver
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} mt={4}>
                                        {
                                            cartItems.some(obj => obj.id === id) ?
                                                <Button variant="contained" color="success" startIcon={<ShoppingCartOutlined />}>
                                                    Added
                                                </Button>
                                                :
                                                <Button variant="contained" startIcon={<ShoppingCartOutlined />} onClick={() => setCartItem(itemInfo)}>
                                                    Add to Cart
                                                </Button>
                                        }

                                        <IconButton variant="contained">
                                            <HeartOutlined />
                                        </IconButton>
                                    </Grid>
                                </Grid>

                            </CardContent>
                        </Box>

                    </Card>
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