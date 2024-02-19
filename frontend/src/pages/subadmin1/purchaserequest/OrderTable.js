import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Box, Grid, Button } from '@mui/material';
const OrderTable = (props) => {
  const [rows, setRows] = useState([]);
  const columns = [
    {
      field: 'group',
      headerName: 'Order No.',
      editable: false,
      flex: 1
    },

    {
      field: 'customerName',
      headerName: 'Customer Name',
      editable: false,
      flex: 1
    },
    {
      field: 'dateRequested',
      headerName: 'Date Requested',
      editable: false,
      flex: 1,
      valueGetter: (params) => `${params.row.dateRequested.substring(0, 10)}`
    },
    {
      field: 'action',
      headerName: 'View Purchase Request',
      editable: false,
      flex: 1,
      renderCell: (params) => {
        const onClick = (event) => {
          event.stopPropagation();

          // eto gamitin sa get PR
          console.log('xxx', params.row.group);
        };
        return (
          <Button variant="outlined" color="primary" onClick={onClick}>
            VIEW
          </Button>
        );
      }
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
            rows={rows ? rows : []}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10
                }
              }
            }}
            getRowId={(row) => row.group}
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
