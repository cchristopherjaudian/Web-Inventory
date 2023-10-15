import { DataGrid } from '@mui/x-data-grid';
import {
    Box,
    Grid
} from '@mui/material';
const SalesTable = (props) => {
    const columns = [
        {
            field: 'id',
            headerName: 'Invoice ID',
            editable: false,
            flex:1
        },
        {
            field: 'fullName',
            headerName: 'Customer Name',
            editable: false,
            flex:1
        },
        {
            field: 'itemnumber',
            headerName: 'No. of Items',
            sortable: false,
            flex: 1
        },
        {
            field: 'paymentMethod',
            headerName: 'Payment Method',
            sortable: false,
            flex: 1
        },
        {
            field: 'price',
            headerName: 'Price',
            sortable: false,
            flex: 1
        },
        {
            field: 'dateOrdered',
            headerName: 'Date Ordered',
            sortable: false,
            flex: 1,
            valueGetter: (params) => params.row.dateOrdered ? `${params.row.dateOrdered.substring(0, 10)}` : ''
        },
        {
            field: 'dateDispatched',
            headerName: 'Date Dispatched',
            sortable: false,
            flex: 1,
            valueGetter: (params) => params.row.dateDispatched ? `${params.row.dateDispatched.substring(0, 10)}` : ''
        },
        {
            field: 'dateDelivered',
            headerName: 'Date Delivered',
            sortable: false,
            flex: 1,
            valueGetter: (params) => params.row.dateDelivered ? `${params.row.dateDelivered.substring(0, 10)}` : ''
        },
    ];
    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <Grid container>
                <Grid item xs={12}>
                    <DataGrid
                        autoHeight
                        rows={props.orders? props.orders: []}
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



    );
}

export default SalesTable;