import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect, forwardRef } from 'react';
import { Box, Grid } from '@mui/material';
const ReportTable = (props) => {
  const [gridRows, setGridRows] = useState([]);
  useEffect(() => {
    if (props.products) {
      setGridRows(props.products);
    }
  }, [props.products]);
  const columns = [
    {
      field: 'code',
      headerName: 'Product Code',
      editable: false,
      flex: 1
    },
    {
      field: 'name',
      headerName: 'Product Name',
      editable: false,
      flex: 1
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      editable: false,
      flex: 1
    }
  ];
  return (
    <Box sx={{ width: '100%', mt: 1, p: 1 }}>
      <Grid container>
        <Grid item xs={12}>
          <DataGrid
            autoHeight
            rows={gridRows ? gridRows : []}
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

export default ReportTable;
