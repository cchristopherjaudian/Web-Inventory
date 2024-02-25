import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Grid, Tab, Tabs, Typography } from '@mui/material';
import { RightOutlined } from '@ant-design/icons';
import MainCard from 'components/MainCard';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const QuotationTable = (props) => {
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    };
  }

  const getTextColor = (text) => {
    let textColor = '';

    switch (text) {
      case 'PENDING':
        textColor = '#F4933C';
        break;
      case 'CANCELLED':
        textColor = '#FF6363';
        break;
      case 'PAID':
        textColor = '#006503';
        break;
      case 'PREPARING':
        textColor = '#FF6363';
        break;
      case 'DISPATCHED':
        textColor = '#146AB1';
        break;
      case 'DELIVERED':
        textColor = '#006503';
        break;
      default:
        textColor = '#0000FF';
        break;
    }

    return textColor;
  };

  const [columns, setColumns] = useState([]);
  const [gridRows, setGridRows] = useState([]);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setGridRows(() => []);
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (props.transactions) {
      setGridRows(() => [...props.transactions]);
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
              width: 125,
              minWidth: 150,
              maxWidth: 200
            },
            {
              field: 'dateRequested',
              headerName: 'Date Requested',
              editable: false,
              width: 125,
              minWidth: 150,
              maxWidth: 200,
              valueGetter: (params) => (params.row.dateRequested ? `${params.row.dateRequested.substring(0, 10)}` : '')
            },
            {
              field: 'dateRequired',
              headerName: 'Date Required',
              editable: false,
              width: 125,
              minWidth: 150,
              maxWidth: 200,
              valueGetter: (params) => (params.row.dateRequired ? `${params.row.dateRequired.substring(0, 10)}` : '')
            },
            {
              field: 'quantity',
              headerName: 'Quantity',
              editable: false,
              width: 125,
              minWidth: 150,
              maxWidth: 200
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
              flex: 1,
              renderCell: (params) => {
                const status =
                  params.row?.orderStatus?.length > 0 ? params.row.orderStatus.find((order) => order.isCurrent).status : params.value;
                return (
                  <Typography variant="p" sx={{ color: getTextColor(status) }}>
                    {status}
                  </Typography>
                );
              }
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

export default QuotationTable;
