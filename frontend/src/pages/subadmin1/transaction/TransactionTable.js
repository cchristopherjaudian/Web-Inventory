import { DataGrid } from '@mui/x-data-grid';
import {
    Box,
    Grid
} from '@mui/material';
import MainCard from 'components/MainCard';
const TransactionTable = () => {
    const columns = [
        {
            field: 'invoice',
            headerName: 'Invoice Number',
            editable: false,
            flex: 1
        },
        {
            field: 'date',
            headerName: 'Date',
            editable: false,
            flex:1
        },
        {
            field: 'payment',
            headerName: 'Payment',
            editable: false,
            flex:1
        },
        {
            field: 'contract',
            headerName: 'Contract',
            editable: false,
            flex:1
        },{
            field: 'receipt',
            headerName: 'Receipt',
            editable: false,
            flex:1
        },
        {
            field: 'description',
            headerName: 'Description',
            editable: false,
            flex:1
        },
        {
            field: 'price',
            headerName: 'Price',
            editable: false,
            flex:1
        },
        {
            field: 'qty',
            headerName: 'Qty',
            editable: false,
            flex:1
        },
        {
            field: 'amount',
            headerName: 'Amount',
            editable: false,
            flex:1
        },
        {
            field: 'deposit',
            headerName: 'Deposit',
            editable: false,
            flex:1
        },
    ];

    const rows = [
      
    ];

    return (
        <MainCard sx = {{mt:1}}>
            <Box sx={{ width: '100%' }}>
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
        </MainCard>
    );
}

export default TransactionTable;