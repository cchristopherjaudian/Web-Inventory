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
        if (data) {
            let newData = [];
            data['data'].map((d,i) =>{
                newData.push({
                    id: d['id'],
                    firstname: d['firstname'],
                    middlename: d['middlename'],
                    lastname: d['lastname'],
                    address: d['address'],
                    createdAt: d['createdAt'],
                    status: d['account']['status']
                })
            });
            setRowData(newData);
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
        {
            field: 'createdAt',
            headerName: 'Date Created',
            sortable: false,
            flex: 1,
            valueGetter: (params) => params.row.createdAt ? `${params.row.createdAt.substring(0, 10)}` : ''
        },
        {
            field: 'status',
            headerName: 'Status',
            sortable: false,
            flex: 1
        }
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

export default CustomerTable;