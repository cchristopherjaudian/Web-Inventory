import { DataGrid } from '@mui/x-data-grid';
import {
    Box,
    Button,
    Grid
} from '@mui/material';
import { RightOutlined } from '@ant-design/icons';
import MainCard from 'components/MainCard';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const QuotationTable = (props) => {
    const [gridRows, setGridRows] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (props.transactions) {
            setGridRows(props.transactions);
        }
    }, [props.transactions])
    const columns = [
        {
            field: 'groupNo',
            headerName: 'Quotation ID',
            editable: false,
            flex: 1
        },
        {
            field: 'dateRequested',
            headerName: 'Date Requested',
            editable: false,
            flex: 1,
            valueGetter: (params) => params.row.dateRequested ? `${params.row.dateRequested.substring(0, 10)}` : ''
        },
        {
            field: 'dateRequired',
            headerName: 'Date Required',
            editable: false,
            flex: 1,
            valueGetter: (params) => params.row.dateRequired ? `${params.row.dateRequired.substring(0, 10)}` : ''
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            editable: false,
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
                    navigate('/purchase/quotation/' + params.row.groupNo);
                };

                return <Button endIcon={<RightOutlined />} variant="contained" color="primary" onClick={onClick}>View</Button>;
            }
        }
    ];


    return (
        <MainCard sx={{ mt: 1 }}>
            <Box sx={{ width: '100%' }}>
                <Grid container>
                    <Grid item xs={12}>
                        <DataGrid
                            autoHeight
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
        </MainCard>
    );
}

export default QuotationTable;