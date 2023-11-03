import MainCard from 'components/MainCard';
import Header from './header';
import {
    Grid,
    TextField,
    Box,
    Typography
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cart from './cart';
import useAxios from 'hooks/useAxios';
import useHighAxios from 'hooks/useHighAxios';
const Purchase = () => {
    const groupCode = Date.now();
    const navigate = useNavigate();
    const { data } = useAxios('products', 'GET', null, false);
    const [productList, setProductList] = useState([]);
    const [poProducts, setPoProducts] = useState([]);
    const [dateRequested, setDateRequested] = useState('');
    const [dateRequired, setDateRequired] = useState('');
    const { highData, highFetchData } = useHighAxios('purchase', 'POST', { cart: poProducts }, true);
    useEffect(() => {
        if (data) {
            const newProducts = [];
            data['data']['products'].map((s, i) => {
                newProducts.push({
                    code: s['code'],
                    name: s['name'],
                    size: s['size'],
                    price: s['price'],
                    quantity: 0,
                    isSelected: false
                });
            });
            setProductList(newProducts);
        }
    }, [data]);

    function updateProductProperty(code, update) {
        const updatedProducts = productList.map(p => {
            if (p.code === code) {
                return { ...p, ...update };
            }
            return p;
        });
        setProductList(updatedProducts);
    }

    const createPO = () => {
        const selectedProducts = productList.filter((p) => p.isSelected);
        let mapProducts = [];
        selectedProducts.map((s, i) => {
            mapProducts.push({
                code: s['code'],
                quantity: s['quantity'],
                groupNo: groupCode.toString(),
                dateRequested: dateRequested,
                dateRequired: dateRequired
            });
        });
        console.log(mapProducts);
        setPoProducts(mapProducts);
    }
    useEffect(() => {
        if (poProducts.length > 0) {
            console.log(poProducts);
            highFetchData();
        }
    }, [poProducts]);
    useEffect(() => {
        if (highData) {
            if (highData['status'] === 200) {
                navigate('/purchase/quotation/' + groupCode,{replace:true});
            }
        }
    }, [highData]);
    return (<MainCard sx={{ pt: 3 }}>
        <Header createPO={createPO} dateRequested={dateRequested} setDateRequested={setDateRequested} dateRequired={dateRequired} setDateRequired={setDateRequired} />
        <Typography variant="h6" sx={{ mt: 3 }}>Enter the item you wish to order</Typography>
        <Cart productList={productList} updateProductProperty={updateProductProperty} />
    </MainCard>);
}

export default Purchase;