import { DataGrid } from '@mui/x-data-grid';
import {
    Button,
    Grid
} from '@mui/material';
import {DeleteOutlined} from '@ant-design/icons';
import { useState, useEffect } from 'react';
import MainCard from 'components/MainCard';
import Swal from 'sweetalert2';
const UpdateInventoryTable = (props) => {
    const [productRows, setProductRows] = useState([]);
    const [editRowsModel, setEditRowsModel] = useState({});

    const [info, setInfo] = useState([]);
    useEffect(() => {
        if (props) {
            console.log(props);
            setInfo(props.info);
        }

    }, [JSON.stringify(props.info)]);
    useEffect(() => {
        if (info) {
            setProductRows(info['inventories']);
        }
    }, [info]);
    const handleAddRow = (newItem) => {
        setEditRowsModel({ ...editRowsModel, newItem });
    };

    const columns = [
        {
            field: 'expiration',
            headerName: 'Expiration Date',
            editable: true,
            flex: 1,
            valueGetter: (params) => `${params.row.expiration.substring(0, 10)}`
        },
        {
            field: 'stock',
            headerName: 'Stock',
            editable: true,
            flex: 1
        },
        {
            field: 'stockIndicator',
            headerName: 'Stock Indicator',
            editable: true,
            flex: 1
        },
        {
            field: 'action',
            headerName: '',
            sortable: false,
            width: 150,
            disableClickEventBubbling: true,
            renderCell: (params) => {
                const onClick = (event) => {
                    event.stopPropagation();
                    Swal.fire({
                        icon: 'question',
                        title: 'Inventory Management',
                        text: 'Are you sure you want to delete this product inventory?',
                        showCancelButton: true,
                        confirmButtonText: 'Yes'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            //setDeleteId(params.row.id);
                        }
                    });

                };

                return <Button endIcon={<DeleteOutlined />} variant="outlined" color="error" onClick={onClick}>Delete</Button>;
            }
        }
    ];
    const gridClick = (params, event, details) => {
        let selectedData = params['row'];
    }
    return (<Grid container>
        <Grid item xs={12}>
            <MainCard>
                <DataGrid
                    autoHeight
                    rows={productRows ? productRows : []}
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
            </MainCard>
        </Grid>
    </Grid>);
}

export default UpdateInventoryTable;