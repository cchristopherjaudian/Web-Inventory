import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
const OrderTable = (props) => {
  const [rows, setRows] = useState([]);
  const columns = [
    {
      field: 'id',
      headerName: 'Order No. (Placeholder)',
      editable: false,
      flex: 1
    },
    {
      field: 'createdAt',
      headerName: 'Date Ordered',
      editable: false,
      flex: 1,
      valueGetter: (params) => `${params.row.createdAt.substring(0, 10)}`
    },
    {
      field: 'paymentMethod',
      headerName: 'Payment Method',
      editable: false,
      flex: 1
    },
    {
      field: 'status',
      headerName: 'Status',
      editable: false,
      flex: 1
    }
  ];

  useEffect(() => {
    setRows(props.orderRows);
  }, [props]);

  const gridClick = (params, event, details) => {
    const selectedData = params['row'];
  };
  return (
    <Box sx={{ width: '100%', mt: 1 }}>
      <Grid container>
        <Grid item xs={12}>
          <DataGrid
            autoHeight
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10
                }
              }
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
};

export default OrderTable;
