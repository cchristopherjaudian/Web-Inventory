import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Grid } from '@mui/material';
import MainCard from 'components/MainCard';
import { useState, useEffect } from 'react';
import { RightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const HistoryTable = (props) => {
  const navigate = useNavigate();
  const [gridRows, setGridRows] = useState([]);
  useEffect(() => {
    if (props.transactions) {
      setGridRows(props.transactions);
    }
  }, [props.transactions]);
  const columns = [
    {
      field: 'paymentMethod',
      headerName: 'Payment Method',
      width: 125, minWidth: 150, maxWidth: 200,
      editable: false,
    },
    {
      field: 'orderItems',
      headerName: 'No. of items',
      editable: false,
      width: 125, minWidth: 150, maxWidth: 200,

    },
    {
      field: 'status',
      headerName: 'Status',
      editable: false,
      width: 125, minWidth: 150, maxWidth: 200,

    },
    {
      field: 'dateOrdered',
      headerName: 'Date Ordered',
      editable: false,
      width: 125, minWidth: 150, maxWidth: 200,

      valueGetter: (params) => (params.row.dateOrdered ? `${params.row.dateOrdered.substring(0, 10)}` : '')
    },
    {
      field: 'dispatchedDate',
      headerName: 'Date Dispatched',
      editable: false,
      width: 125, minWidth: 150, maxWidth: 200,

      valueGetter: (params) => (params.row.dateDispatched ? `${params.row.dateDispatched.substring(0, 10)}` : '')
    },
    {
      field: 'dateDelivered',
      headerName: 'Date Delivered',
      editable: false,
      width: 125, minWidth: 150, maxWidth: 200,
      valueGetter: (params) => (params.row.dateDelivered ? `${params.row.dateDelivered.substring(0, 10)}` : '')
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
          navigate('/order/' + params.row.id);
        };

        return (
          <Button endIcon={<RightOutlined />} variant="contained" color="primary" onClick={onClick}>
            View
          </Button>
        );
      }
    }
  ];

  return (
    <MainCard sx={{ mt: 1 }}>
      <Box sx={{ width: '100%' }}>
        <Grid container>
          <Grid item xs={12} md={12}>
            {gridRows.length > 0 && (
              <DataGrid
                autoHeight={true}
                disableExtendRowFullWidth={true}
                rows={gridRows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 10
                    }
                  }
                }}
                getRowId={() => uuidv4()}
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
            )}
          </Grid>
        </Grid>
      </Box>
    </MainCard>
  );
};

export default HistoryTable;
