import { DataGrid } from '@mui/x-data-grid';
import {
    Box,
    Grid
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';



const InventoryTable = (props) => {
    const [productRows, setProductRows] = useState([]);
    const navigate = useNavigate();
    const columns = [
        {
            field: 'code',
            headerName: 'Product Code',
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
            field: 'category',
            headerName: 'Category',
            editable: false,
            flex: 1
        },
        {
            field: 'price',
            headerName: 'Price',
            editable: false,
            flex: 1
        }, {
            field: 'size',
            headerName: 'Size',
            editable: false,
            flex: 1
        }, {
            field: 'content',
            headerName: 'Content',
            editable: false,
            flex: 1
        }
    ];
    const gridClick = (params, event, details) => {
        let selectedData = params['row'];
        let uri = '/inventories/' + selectedData.id;
        console.log(uri);
        navigate(uri);
        
    }
    useEffect(() => {
        console.log(props.products);
        setProductRows(props.products);

    }, [props.products])
    const inventoryList = productRows;
    return (
        <Box sx={{ width: '100%' }}>
            <Grid container>
                <Grid item xs={12}>
                    <DataGrid
                        autoHeight
                        rows={inventoryList}
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

export default InventoryTable;