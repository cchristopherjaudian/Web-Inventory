import { DataGrid } from '@mui/x-data-grid';
import { RightOutlined, LoadingOutlined } from '@ant-design/icons';
import {
    Box,
    Button,
    Grid
} from '@mui/material';
import useAxios from 'hooks/useAxios';
import useInventoryAxios from 'hooks/useInventoryAxios';
import { useState, useEffect, forwardRef } from 'react';
import Swal from 'sweetalert2';


const OrderTable = (props) => {

    const [gridRows, setGridRows] = useState([]);
    const [orderId, setOrderId] = useState('');
    const [paidOrder, setPaidOrder] = useState('');
    const { data, fetchData } = useAxios('orders/' + orderId, 'GET', null, false);
    const { inventoryData, inventoryFetchData } = useInventoryAxios('orders/' + paidOrder, 'PATCH', { status: 'PAID', refNo: '1' }, false);

    useEffect(() => {
        if (props.orders) {
            setGridRows(props.orders);
        }
    }, [props.orders]);
    useEffect(() => {
        if (paidOrder) {

            inventoryFetchData();
            setPaidOrder('');

        }
    }, [paidOrder]);
    useEffect(() => {
        if (inventoryData) {
            console.log(inventoryData);
            if (inventoryData['status'] === 200) {
                props.setMessage('Order set as paid successfully');
                props.handleClick();
                props.refreshTable();
                props.setSelectedOrder({});
            }
        }
    }, [inventoryData]);
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
            flex: 1
        },
        {
            field: 'createdAt',
            headerName: 'Date Ordered',
            editable: false,
            flex: 1,
            valueGetter: (params) => `${params.row.createdAt.substring(0, 10)}`
        },
        {
            field: 'paymentMethod',
            headerName: 'Payment Method',
            editable: false,
            flex: 1
        }, {
            field: 'action',
            headerName: '',
            sortable: false,
            width: 150,
            disableClickEventBubbling: true,
            renderCell: (params) => {
                const onClick = (event) => {
                    event.stopPropagation();
                    Swal.fire({
                        icon: 'question',
                        title: 'Order Status',
                        text: 'Are you sure you want to set this order as paid?',
                        showCancelButton: true,
                        confirmButtonText: 'Yes'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            setPaidOrder(params.row.id);
                        }
                    });

                };

                return <Button endIcon={<RightOutlined />} variant="contained" color="success" onClick={onClick}>Set as Paid</Button>;
            }
        }
    ];

    const gridClick = (params, event, details) => {
        let selectedData = params['row'];
        setOrderId(selectedData.id);
        //props.setSelectedOrder(selectedData);
    }
    useEffect(() => {
        if (orderId) {
            fetchData();
            setOrderId('');
        }
    }, [orderId]);
    useEffect(() => {
        if (data) {
            const steps = data['data']['orderStatus'];
            props.setSelectedOrder(data['data']);
            props.setOrderSteps(steps);
        }
    }, [data]);


    return (
        <Box sx={{ width: '100%', mt: 1 }}>

            <Grid container>

                <Grid item xs={12}>
                    <DataGrid
                        autoHeight
                        rows={gridRows}
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
                        sx={{
                            '.MuiDataGrid-cell:focus': {
                                outline: 'none'
                            },
                            '& .MuiDataGrid-row:hover': {
                                cursor: 'pointer'
                            }
                        }}
                    />
                </Grid>
            </Grid>
        </Box>



    );
}

export default OrderTable;