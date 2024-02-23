import { DataGrid } from '@mui/x-data-grid';
import { RightOutlined } from '@ant-design/icons';
import { Box, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const OrderTable = ({ orders }) => {
  const navigate = useNavigate();

  const columns = [
    {
      field: 'id',
      headerName: 'Order ID',
      editable: false,
      flex: 1,
      valueGetter: (params) => params.row.orders.id
    },
    {
      field: 'name',
      headerName: 'Name',
      editable: false,
      flex: 1,
      valueGetter: (params) =>
        `${params.row.orders.profile.firstname} ${params.row.orders.profile.middlename ?? ''} ${params.row.orders.profile.lastname}`
    },
    {
      field: 'createdAt',
      headerName: 'Dispatched',
      editable: false,
      flex: 1,
      valueGetter: (params) => (params.row.createdAt ? `${params.row.createdAt.substring(0, 10)}` : '')
    },
    {
      field: 'action2',
      headerName: 'View Order Details',
      sortable: false,
      width: 150,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <Button endIcon={<RightOutlined />} variant="contained" color="primary" onClick={() => navigate(`/order/${params.id}`)}>
            View
          </Button>
        );
      }
    }
  ];

  return (
    <Box sx={{ width: '100%', mt: 1 }}>
      <Grid container>
        <Grid item xs={12}>
          <DataGrid
            autoHeight
            rows={orders}
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

export default OrderTable;
