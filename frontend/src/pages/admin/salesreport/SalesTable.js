import { DataGrid } from '@mui/x-data-grid';
import {
    Box,
    Grid
} from '@mui/material';
const SalesTable = () => {
    const columns = [
        {
            field: 'invoiceID',
            headerName: 'Invoice ID',
            editable: false,
            flex:1
        },
        {
            field: 'date',
            headerName: 'Date',
            editable: false,
            flex:1
        },
        {
            field: 'customer',
            headerName: 'Customer',
            editable: false,
            flex: 1
        },
        {
            field: 'receipt',
            headerName: 'Receipt',
            sortable: false,
            flex: 1
        },
        {
            field: 'description',
            headerName: 'Description',
            sortable: false,
            flex: 1
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            sortable: false,
            flex: 1
        },
        {
            field: 'status',
            headerName: 'Status',
            sortable: false,
            flex: 1
        },
        {
            field: 'amount',
            headerName: 'Amount',
            sortable: false,
            flex: 1
        },
    ];

    const rows = [
     
    ];

    return (
        <Box sx={{ height: 400, width: '100%' }}>
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