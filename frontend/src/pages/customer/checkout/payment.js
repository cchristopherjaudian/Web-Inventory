import Option from "./option";
import { Grid, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import useAxios from 'hooks/useAxios';

const Payment = (props) => {

    const methods = [
        { id: 1, code: 'COD', name: 'Cash on Delivery', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laoreet faucibus fringilla. In tristique at risus ut sagittis. Proin vel congue ante. Fusce ultrices arcu lectus,' },
        { id: 2, code: 'GCASH', name: 'GCash', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laoreet faucibus fringilla. In tristique at risus ut sagittis. Proin vel congue ante. Fusce ultrices arcu lectus,' },
        { id: 3, code: 'BANK_TRANSFER', name: 'Bank Transfer', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laoreet faucibus fringilla. In tristique at risus ut sagittis. Proin vel congue ante. Fusce ultrices arcu lectus,' }
    ]

    return (<Grid container spacing={1}>
        {
            methods.map((method, index) => {
                return <Grid item xs={12} key={index} onClick={() => props.setPayMethod(method.code)}>
                    <Option name={method.name} description={method.description} />
                </Grid>;

            })
        }
    </Grid>);
}

export default Payment;