import { DataGrid } from '@mui/x-data-grid';
import {
    Box,
    Grid
} from '@mui/material';
import { useState, useEffect } from 'react';
const InventoryTable = (props) => {
    const [gridRows, setGridRows] = useState([]);
    useEffect(() => {
        if (props.inventory) {
            setGridRows(props.inventory);
        }
    }, [props.inventory]);
    const columns = [
        {
            field: 'code',
            headerName: 'Product Code',
            editable: false,
            flex: 1
        },
        {
            field: 'name',
            headerName: 'Product Name',
            editable: false,
            flex: 1
        },
        {
            field: 'price',
            headerName: 'Price',
            sortable: false,
            flex: 1
        },
    ];
    return (
        <Box sx={{ width: '100%' }}>
            <Grid container>
                <Grid item xs={12}>
                    <DataGrid
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
                    />
                </Grid>
            </Grid>
        </Box>



    );
}

export default InventoryTable;