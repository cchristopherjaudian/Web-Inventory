import {
    Grid
} from '@mui/material';
import HeadInfo from './headinfo';
import Cart from './cart';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useAxios from 'hooks/useAxios';
import useHighAxios from 'hooks/useHighAxios';
import Swal from 'sweetalert2';
const Order = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const [mapPayload, setMapPayload] = useState({});
    const [payMethod, setPaymethod] = useState('');
    const [prInfo, setPrInfo] = useState({});
    const { data } = useAxios('purchase/' + id, 'GET', null, false);
    const { highData, highLoading, highFetchData } = useHighAxios('orders', 'POST', mapPayload, true);
    const mainPayload = {};
    useEffect(() => {
        if (data) {
            let totalValue = data['data']['list']?.reduce((total, item) => {
                return total + (item.quantity * item.products.price);
            }, 0);
            setPrInfo({ ...data['data'], totalAmount: totalValue });
        }
    }, [data]);
    const proceedCheckout = () => {
        let msg = '';
        if (!payMethod) {
            msg = 'Please select a payment method from the list'
        }
        if (prInfo.list.length === 0) {
            msg = 'No products found for this purchase request/quotation'
        }
        if (msg) {
            Swal.fire({
                icon: 'info',
                title: 'Create Purchase Order',
                text: msg,
                showCancelButton: false,
                allowOutsideClick: false,
                confirmButtonText: 'OK'
            });
            return
        }
        Swal.fire({
            icon: 'question',
            title: 'Purchase Order',
            text: 'Are you sure you want to proceed with your order?',
            showCancelButton: true,
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                let mapProducts = [];
                let tempPayload = {
                    paymentMethod: payMethod
                }
                prInfo.list.map((pr, i) => {
                    mapProducts.push({
                        cartId: pr['id'],
                        productId: pr['products']['id']
                    })
                })
                let testPayload = { ...tempPayload, items: mapProducts };
                setMapPayload({ ...tempPayload, items: mapProducts });
            }
        })

    }
    useEffect(() => {
        if (mapPayload) {
            highFetchData();
        }
    }, [mapPayload]);
    useEffect(() => {
        if (highData) {
            if (highData['status'] === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Purchase Order',
                    text: 'PO created successfully. Click OK to continue',
                    allowOutsideClick: false,
                    showCancelButton: false,
                    confirmButtonText: 'Ok'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/history', { replace: true })
                    }
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Purchase Order',
                    text: 'Failed to create PO. Please try again',
                    allowOutsideClick: false,
                    showCancelButton: false,
                    confirmButtonText: 'Ok'
                })
            }
        }
    }, [highData]);
    return (
        <Grid container spacing={1} sx={{ mt: 2 }}>
            <Grid item xs={12} lg={3}>
                <HeadInfo highLoading={highLoading} prInfo={prInfo} payMethod={payMethod} setPaymethod={setPaymethod} proceedCheckout={proceedCheckout} />
            </Grid>
            <Grid item xs={12} lg={9}>
                <Cart prInfo={prInfo} />
            </Grid>
        </Grid>
    );
}

export default Order;