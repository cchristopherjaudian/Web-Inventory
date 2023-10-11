import { DataGrid } from '@mui/x-data-grid';
import {
    Box,
    Grid
} from '@mui/material';
import useAxios from 'hooks/useAxios';
import { useState, useEffect } from 'react';
const AccountTable = () => {
    const { data, loading, error, fetchData } = useAxios('accounts/admins', 'GET');
    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        if (data !== null) {
            setRowData(data['data']);
        }

    }, [data]);
    useEffect(() => {
        fetchData();
    }, []);
    const columns = [
        {
            field: 'account',
            headerName: 'Account',
            editable: false,
            flex: 1
        },
        {
            field: 'fullName',
            headerName: 'Full name',
            sortable: false,
            flex: 1,
            valueGetter: (params) =>
                `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
        {
            field: 'contact',
            headerName: 'Contact',
            editable: false,
            flex: 1
        },
        {
            field: 'email',
            headerName: 'Email',
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