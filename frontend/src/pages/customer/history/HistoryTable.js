import { DataGrid } from '@mui/x-data-grid';
import {
    Box,
    Grid
} from '@mui/material';
import MainCard from 'components/MainCard';
import { useState, useEffect } from 'react';
const HistoryTable = (props) => {
    const [gridRows, setGridRows] = useState([]);
    console.log(props);
    useEffect(() => {
        if (props.transactions) {
            setGridRows(props.transactions);
        }
    }, [props.transactions])
    const columns = [
        {
            field: 'paymentMethod',
            headerName: 'Payment Method',
            editable: false,
            flex: 1
        },
        {
            field: 'orderItems',
            headerName: 'No. of items',
            editable: false,
            flex: 1
        },
        {
            field: 'status',
            headerName: 'Status',
            editable: false,
            flex: 1
        },
        {
            field: 'dateOrdered',
            headerName: 'Date Ordered',
            editable: false,
            flex: 1,
            valueGetter: (params) => params.row.dateOrdered ? `${params.row.dateOrdered.substring(0, 10)}` : ''
        },
        {
            field: 'dispatchedDate',
            headerName: 'Date Dispatched',
            editable: false,
            flex: 1,
            valueGetter: (params) => params.row.dispatchedDate ? `${params.row.dispatchedDate.substring(0, 10)}` : ''

        },
        {
            field: 'dateDelivered',
            headerName: 'Date Delivered',
            editable: false,
            flex: 1,
            valueGetter: (params) => params.row.dateDelivered ? `${params.row.dateDelivered.substring(0, 10)}` : ''

        }
    ];


    return (
        <MainCard sx={{ mt: 1 }}>
            <Box sx={{ width: '100%' }}>
                <Grid container>
                    <Grid item xs={12}>
                        <DataGrid
                            autoHeight
                            rows={gridRows ? gridRows : []}
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
        </MainCard>
    );
}

export default HistoryTable;