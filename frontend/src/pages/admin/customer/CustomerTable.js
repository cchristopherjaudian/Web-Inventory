import { DataGrid } from '@mui/x-data-grid';
import {
    Box,
    Button,
    Grid
} from '@mui/material';
import useAxios from 'hooks/useAxios';
import useHighAxios from 'hooks/useHighAxios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const CustomerTable = (props) => {
    const [payload, setPayload] = useState({});
    const { data, loading, error, fetchData } = useAxios('accounts/' + props.type, 'GET');
    const { highData, highFetchData } = useHighAxios('', 'PATCH/POST?', payload);

    const [rowData, setRowData] = useState([]);
    useEffect(() => {
        if (data) {
            let newData = [];
            data['data'].map((d, i) => {
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
        if (Object.keys(payload).length > 0) highFetchData();
    }, [payload]);
    useEffect(() => {
        if (highData) {
            if (highData.status === 200) {
                Swal.fire({
                    title: 'Restrict Account',
                    text: 'Account restricted successfully',
                    icon: 'success'
                })
            } else {
                Swal.fire({
                    title: 'Restrict Account',
                    text: 'Failed to restrict business account. Please try again',
                    icon: 'error'
                })
            }
        }
    }, [highData]);
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

    if (props.type === 'B2B') {
        columns.push({
            field: 'action2',
            headerName: '',
            sortable: false,
            width: 150,
            disableClickEventBubbling: true,
            renderCell: (params) => {
                const onClick = (event) => {
                    event.stopPropagation();
                    Swal.fire({
                        icon: 'question',
                        title: 'Restrict Account',
                        text: 'Are you sure you want to restrict this account?',
                        showCancelButton: true,
                        confirmButtonText: 'Yes'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            setPayload({});
                        }
                    });
                };

                return (
                    <Button variant="contained" color="error" onClick={onClick}>
                        Restrict
                    </Button>
                );
            }
        });
    }

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