import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Grid, Tab, Tabs } from '@mui/material';
import PropTypes from 'prop-types';
import { RightOutlined } from '@ant-design/icons';
import MainCard from 'components/MainCard';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const QuotationTable = (props) => {
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    };
  }
  const [columns, setColumns] = useState([]);
  const [gridRows, setGridRows] = useState([]);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (props.transactions) {
      setGridRows(props.transactions);
    }
  }, [props.transactions]);
  useEffect(() => {
    let newColumns =
      value === 1
        ? [
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
              valueGetter: (params) => (params.row.dateRequested ? `${params.row.dateRequested.substring(0, 10)}` : '')
            },
            {
              field: 'dateRequired',
              headerName: 'Date Required',
              editable: false,
              flex: 1,
              valueGetter: (params) => (params.row.dateRequired ? `${params.row.dateRequired.substring(0, 10)}` : '')
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

                return (
                  <Button endIcon={<RightOutlined />} variant="contained" color="primary" onClick={onClick}>
                    View
                  </Button>
                );
              }
            }
          ]
        : [
            {
              field: 'paymentMethod',
              headerName: 'Payment Method',
              editable: false,
              flex: 1
            },
            {
              field: 'orderItems',
              headerName: 'No. of items',
              editable: false,
              flex: 1
            },
            {
              field: 'status',
              headerName: 'Status',
              editable: false,
              flex: 1
            },
            {
              field: 'dateOrdered',
              headerName: 'Date Ordered',
              editable: false,
              flex: 1,
              valueGetter: (params) => (params.row.dateOrdered ? `${params.row.dateOrdered.substring(0, 10)}` : '')
            },
            {
              field: 'dispatchedDate',
              headerName: 'Date Dispatched',
              editable: false,
              flex: 1,
              valueGetter: (params) => (params.row.dateDispatched ? `${params.row.dateDispatched.substring(0, 10)}` : '')
            },
            {
              field: 'dateDelivered',
              headerName: 'Date Delivered',
              editable: false,
              flex: 1,
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

    setColumns(newColumns);
    props.setRequestType(value);
  }, [value]);

  return (
    <MainCard sx={{ mt: 1 }}>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Purchase Orders" {...a11yProps(0)} />
            <Tab label="Quotations" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <Grid container>
          <Grid item xs={12}>
            {gridRows.length > 0 && (
              <DataGrid
                autoHeight
                rows={gridRows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 10
                    }
                  }
                }}
                getRowId={(data) => data?.groupNo}
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

export default QuotationTable;
