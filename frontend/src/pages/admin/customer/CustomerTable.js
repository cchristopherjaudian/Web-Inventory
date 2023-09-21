import { DataGrid } from '@mui/x-data-grid';
import {
    Box,
    Grid
} from '@mui/material';
import useAxios from 'hooks/useAxios';
import { useState, useEffect } from 'react';

const CustomerTable = (props) => {
   
    const { data, loading, error, fetchData } = useAxios('accounts/' + props.type, 'GET');
    const [rowData, setRowData] = useState([]);
    useEffect(() => {
        if (data !== null) {
            setRowData(data['data']);
        }
    }, [data]);
    useEffect(() => {
        fetchData();
    }, [props]);
    const columns = [
        {
            field: 'firstname',
            headerName: 'First name',
            editable: false,
            flex: 1
        },
        {
            field: 'lastname',
            headerName: 'Last name',
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
            sortable: false,
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
                    />
                </Grid>
            </Grid>
        </Box>



    );
}

export default CustomerTable;