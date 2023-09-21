import { DataGrid } from '@mui/x-data-grid';
import {
    Box,
    Grid
} from '@mui/material';
const InventoryTable = () => {
    const columns = [
        {
            field: 'products',
            headerName: 'Products',
            editable: false,
            flex:1
        },
        {
            field: 'buying',
            headerName: 'Buying Price',
            editable: false,
            flex:1
        },
        {
            field: 'qty',
            headerName: 'Quantity',
            editable: false,
            flex: 1
        },
        {
            field: 'threshold',
            headerName: 'Threshold Value',
            editable: false,
            flex: 1
        },
        {
            field: 'updated',
            headerName: 'Updated',
            editable: false,
            flex: 1
        },
        {
            field: 'availability',
            headerName: 'Availability',
            editable: false,
            flex: 1
        },
    ];

    const rows = [
     
    ];

    return (
        <Box sx={{width: '100%' }}>
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

export default InventoryTable;