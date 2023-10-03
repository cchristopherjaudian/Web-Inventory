import { DataGrid } from '@mui/x-data-grid';
import {
    Grid
} from '@mui/material';
import { useState, useEffect } from 'react';
import MainCard from 'components/MainCard';
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
            flex: 1
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
                />
            </MainCard>
        </Grid>
    </Grid>);
}

export default UpdateInventoryTable;