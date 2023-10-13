import { DataGrid } from '@mui/x-data-grid';
import {
    Box,
    Grid
} from '@mui/material';
import useAxios from 'hooks/useAxios';
import { useState, useEffect } from 'react';
const AccountTable = () => {
    const { data } = useAxios('accounts/admins', 'GET', null, false);
    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        if (data) {
            setRowData(data['data']);
        }

    }, [data]);

    const columns = [
        {
            field: 'lastname',
            headerName: 'Last name',
            sortable: false,
            flex: 1
        },
        {
            field: 'firstname',
            headerName: 'First Name',
            editable: false,
            flex: 1
        },
        {
            field: 'middlename',
            headerName: 'Middle Name',
            editable: false,
            flex: 1
        },
        {
            field: 'address',
            headerName: 'Address',
            editable: false,
            flex: 1
        },

    ];

    const rows = rowData;

    return (
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

export default AccountTable;