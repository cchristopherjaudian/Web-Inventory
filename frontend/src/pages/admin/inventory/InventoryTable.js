import { DataGrid } from '@mui/x-data-grid';
import {
    Box,
    Grid
} from '@mui/material';
const InventoryTable = () => {
    const columns = [
        {
            field: 'name',
            headerName: 'Product Name',
            editable: false,
            
        },
        {
            field: 'soldqty',
            headerName: 'Sold Qty',
            editable: false,
            
        },
        {
            field: 'remaining',
            headerName: 'Remaining Qty',
            editable: false,
            
        },
        {
            field: 'price',
            headerName: 'Price',
            sortable: false,
            
        },
    ];

    const rows = [
      
    ];

    return (
        <Box sx={{width: '100%' }}>
            <Grid container>
                <Grid item xs={12}>
                    <DataGrid
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