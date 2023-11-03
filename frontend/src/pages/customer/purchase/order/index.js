import {
    Grid
} from '@mui/material';
import HeadInfo from './headinfo';
import Cart from './cart';
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import useAxios from 'hooks/useAxios';
const Order = () => {
    let { id } = useParams();
    const [prInfo, setPrInfo] = useState({});
    const { data } = useAxios('purchase/' + id, 'GET', null, false);

    useEffect(() => {
        if (data) {
            setPrInfo(data['data']);
        }
    }, [data]);
    return (
        <Grid container spacing={1} sx={{ mt: 2 }}>
            <Grid item xs={12} lg={3}>
                <HeadInfo prInfo={prInfo}/>
            </Grid>
            <Grid item xs={12} lg={9}>
                <Cart prInfo={prInfo}/>
            </Grid>
        </Grid>
    );
}

export default Order;