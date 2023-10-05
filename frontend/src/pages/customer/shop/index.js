import MainCard from "components/MainCard";
import { Box, Button, Card, CardContent, CardMedia, CardActionArea, CardActions, FormControl, InputLabel, Grid, Select, MenuItem, Typography, TextField } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import useAxios from "hooks/useAxios";
import useAxiosBackup from "hooks/useAxiosBackup";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "store/reducers/cart";
const Shop = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const reduxcart = useSelector((state) => state.cart.cart);

    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState({});
    const [cartItem, setCartItem] = useState({});
    const { data, fetchData } = useAxios('products', 'GET', null, false);
    const { profile, fetchProfile } = useAxiosBackup('carts', 'POST', selectedProduct);
    useEffect(() => {
        if (data) {
            setProducts(data['data']);
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
                
                let newCart = [...reduxcart];
                const dispatchProduct = { ...profile['data'], inventory: { products: cartItem } };
                let objectIndex = reduxcart.findIndex(item => item.inventory.products.code === cartItem.code);
                if(objectIndex === -1){
                    newCart.push(dispatchProduct);
                } else{
                    newCart[objectIndex] = dispatchProduct;
                }
                console.log(newCart);
                dispatch(setCart(newCart));
                setSelectedProduct({});
                setCartItem({});
            }
        }
    }, [profile]);
    return (
        <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12}>
                <Box component="img" src="https://placehold.co/700x200" alt="Featured" sx={{ width: '100%', height: '200' }} />
            </Grid>

            <Grid item xs={12} sx={{ mt: 3 }}>
                <MainCard>
                    <form style={{ display: 'flex', alignItems: 'center' }}>
                        <TextField id="searchProduct" label="Search" variant="outlined" sx={{ width: '300px' }} />
                        <Select id="selectSort" sx={{ marginRight: '10px', marginLeft: '10px', width: '200px' }}>
                            {/* <MenuItem value={10}>Option 1</MenuItem>
                            <MenuItem value={20}>Option 2</MenuItem>
                            <MenuItem value={30}>Option 3</MenuItem> */}
                        </Select>
                        <Button variant="contained" color="primary">
                            Search
                        </Button>
                    </form>
                </MainCard>
            </Grid>

            {
                products.map((product, index) => {
                    return (
                        <Grid item xs={3} key={index}>
                            <Card >
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        image="https://placehold.co/300"
                                        alt={product.name}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {product.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {product.size}{' '}{product.price}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="secondary" variant="outlined" onClick={() => navigate('/product/' + product.id)}>
                                        Learn More
                                    </Button>
                                    <Button size="small" color="primary" variant="contained" onClick={() => setCartItem(product)}>
                                        Add to Cart
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    )
                })
            }
        </Grid>
    );
}

export default Shop;