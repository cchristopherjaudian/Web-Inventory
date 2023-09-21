import { DataGrid } from '@mui/x-data-grid';
import {
    Box,
    Grid
} from '@mui/material';
const OrderTable = () => {
    const columns = [
        {
            field: 'name',
            headerName: 'Name',
            editable: false,
            flex: 1
        },
        {
            field: 'status',
            headerName: 'User Status',
            editable: false,
            flex:1
        },
        {
            field: 'status2',
            headerName: 'User Status',
            editable: false,
            flex:1
        },
        {
            field: 'status3',
            headerName: 'Order Status',
            editable: false,
            flex:1
        },
        {
            field: 'invoices',
            headerName: 'Invoices',
            editable: false,
            flex:1
        }
    ];

    const rows = [
   
    ];

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
                    />
                </Grid>
            </Grid>
        </Box>



    );
}

export default OrderTable;