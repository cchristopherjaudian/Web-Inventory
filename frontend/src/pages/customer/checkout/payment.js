import Option from "./option";
import { Grid, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import useAxios from 'hooks/useAxios';
import { useSelector } from "react-redux";

const Payment = (props) => {
    const accType = useSelector((state)=>state.profile.accType);
    const methods = [
        { id: 1, img: '/asset/cod.png', code: 'COD', name: 'Cash on Delivery', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laoreet faucibus fringilla. In tristique at risus ut sagittis. Proin vel congue ante. Fusce ultrices arcu lectus,' },
        { id: 2, img: '/asset/gcash.png', code: 'GCASH', name: 'GCash', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laoreet faucibus fringilla. In tristique at risus ut sagittis. Proin vel congue ante. Fusce ultrices arcu lectus,' },
        { id: 3, img: '/asset/bank.png', code: 'BANK_TRANSFER', name: 'Bank Transfer', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laoreet faucibus fringilla. In tristique at risus ut sagittis. Proin vel congue ante. Fusce ultrices arcu lectus,' }
    ]
    let payMethods = accType.accType === 'BUSINESS' ? 
    methods.filter(item => item.code !== 'COD')
    :
    methods;
    return (<Grid container spacing={1}>
        {
            payMethods.map((method, index) => {
                return  <Grid item xs={12} key={index} onClick={() => props.setPayMethod(method.code)}>
                    <Option name={method.name} description={method.description} img={method.img} />
                </Grid>;

            })
        }
    </Grid>);
}

export default Payment;