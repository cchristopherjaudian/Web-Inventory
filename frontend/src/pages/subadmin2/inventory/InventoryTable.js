import { DataGrid } from '@mui/x-data-grid';
import {
    Box,
    Grid
} from '@mui/material';
import useAxios from 'hooks/useAxios';
import { useState, useEffect } from 'react';



const InventoryTable = (props) => {
    
    const columns = [
        {
            field: 'code',
            headerName: 'Code',
            editable: false,
            flex: 1
        },
        {
            field: 'name',
            headerName: 'Name',
            editable: false,
            flex: 1
        },
        {
            field: 'size',
            headerName: 'Size',
            editable: false,
            flex: 1
        },
        {
            field: 'price',
            headerName: 'Price',
            editable: false,
            flex: 1
        },
        {
            field: 'content',
            headerName: 'Content',
            editable: false,
            flex: 1
        }
    ];
    const productList = props.products;
    return (
        <Box sx={{ width: '100%' }}>
            <Grid container>
                <Grid item xs={12}>
                    <DataGrid
                        autoHeight
                        rows={productList}
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