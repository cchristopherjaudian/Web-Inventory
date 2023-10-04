import { DataGrid } from '@mui/x-data-grid';
import {
    Box,
    Grid
} from '@mui/material';
import useAxios from 'hooks/useAxios';
import { useState,useEffect } from 'react';
const OrderTable = (props) => {
    const [orderId,setOrderId] = useState('');
    const {data,fetchData} = useAxios('orders/' + orderId,'GET',null,false);
    const columns = [
        {
            field: 'id',
            headerName: 'Order ID',
            editable: false,
            flex: 1
        },
        {
            field: 'name',
            headerName: 'Name',
            editable: false,
            flex: 1,
            valueGetter: (params) => `${params.row.firstname} ${params.row.middlename} ${params.row.lastname}`
        },
        {
            field: 'status',
            headerName: 'Order Status',
            editable: false,
            flex:1
        },
        {
            field: 'createdAt',
            headerName: 'Date Ordered',
            editable: false,
            flex:1
        },
        {
            field: 'paymentMethod',
            headerName: 'Payment Method',
            editable: false,
            flex:1
        }
    ];

    const gridClick = (params, event, details) => {
        let selectedData = params['row'];
        setOrderId(selectedData.id);
        //props.setSelectedOrder(selectedData);
    }
    useEffect(()=>{
        if(orderId ){
            fetchData();
            setOrderId('');
        }
    },[orderId]);
    useEffect(()=>{
        if(data){
            const steps = data['data']['orderStatus'];
            props.setSelectedOrder(data['data']);
            props.setOrderSteps(steps);
        }
    },[data]);
    const rows = props.orders;

    return (
        <Box sx={{width: '100%', mt:1 }}>
            <Grid container>
                <Grid item xs={12}>
                    <DataGrid
                        autoHeight
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 10,
                                },
                            },
                        }}
                        pageSizeOptions={[10]}
                        disableRowSelectionOnClick
                        onCellClick={gridClick}
                    />
                </Grid>
            </Grid>
        </Box>



    );
}

export default OrderTable;