import MainCard from 'components/MainCard';
import {
    Stack,
    Button,
    Grid,
    TextField,
    FormControlLabel,
    Checkbox,
    Box
} from '@mui/material';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAxios from 'hooks/useAxios';
const ProductInfo = (props) => {
    const [info, setInfo] = useState([]);
    const [productInfo, setProductInfo] = useState({});
    useEffect(() => {

        if (props) {
            setInfo(props.info);
        }

    }, [JSON.stringify(props.info)]);
    useEffect(() => {
        if (info) {
            setProductInfo(info['product']);
        }
    }, [info]);

    return (
        <MainCard>
            <Box>
                <Grid container spacing={1.5}>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end' }}>
                        <Button variant="outlined" color="primary" component={Link} to="/">Back to Products</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="code"
                            fullWidth
                            id="code"
                            disabled
                            value={productInfo ? productInfo.code : ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="name"
                            fullWidth
                            id="name"
                            disabled
                            value={productInfo ? productInfo.name : ''}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            name="price"
                            fullWidth
                            id="price"
                            disabled
                            value={productInfo ? productInfo.price : ''}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            name="size"
                            fullWidth
                            id="size"
                            disabled
                            value={productInfo ? productInfo.size : ''}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            name="content"
                            fullWidth
                            id="content"
                            disabled
                            value={productInfo ? productInfo.content : ''}
                        />
                    </Grid>

                </Grid>
            </Box>
        </MainCard>
    );
}

export default ProductInfo;