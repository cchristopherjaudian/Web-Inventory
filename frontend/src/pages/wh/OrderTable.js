import firebaseConfig from 'config/firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import { DataGrid } from '@mui/x-data-grid';
import { RightOutlined } from '@ant-design/icons';
import { Box, Button, Grid, Typography } from '@mui/material';
import useAxios from 'hooks/useAxios';
import useInventoryAxios from 'hooks/useInventoryAxios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderTable = (props) => {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({});
  const [gridRows, setGridRows] = useState([]);
  const [orderId, setOrderId] = useState('');
  const [paidOrder, setPaidOrder] = useState('');
  const { data, fetchData } = useAxios('orders/' + orderId, 'GET', null, true);
  const { inventoryData, inventoryFetchData } = useInventoryAxios('orders/' + paidOrder, 'PATCH', { status: 'PAID' }, true);

  const [firebaseApp] = useState(() => {
    if (!firebase.apps.length) {
      return firebase.initializeApp(firebaseConfig);
    } else {
      return firebase.app();
    }
  });
  const database = firebaseApp.database();

  useEffect(() => {
    if (props.orders) {
      setGridRows(props.orders);
    }
  }, [props.orders]);
  useEffect(() => {
    if (Object.keys(customer).length > 0) {
      setCustomer({});
    }
  }, [customer]);
  useEffect(() => {
    if (paidOrder) {
      inventoryFetchData();
      setPaidOrder('');
    }
  }, [paidOrder]);
  useEffect(() => {
    if (inventoryData) {
      if (inventoryData['status'] === 200) {
        props.setMessage('Order set as paid successfully');
        props.handleClick();
        props.refreshTable();
        props.setSelectedOrder({});
      }
    }
  }, [inventoryData]);

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

  const columns = [
    {
      field: 'id',
      headerName: 'Order ID',
      editable: false,
      flex: 1
    },
    {
      field: 'name',
      headerName: 'Name',
      editable: false,
      flex: 1,
      valueGetter: (params) => `${params.row.firstname} ${params.row.middlename ?? ''} ${params.row.lastname}`
    },
    {
      field: 'status',
      headerName: 'Order Status',
      editable: false,
      flex: 1,
      renderCell: (params) => {
        const status = params.row?.orderStatus?.length > 0 ? params.row.orderStatus.find((order) => order.isCurrent).status : params.value;
        return (
          <Typography variant="p" sx={{ color: getTextColor(status) }}>
            {status}
          </Typography>
        );
      }
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
      flex: 1,
      renderCell: (params) => {
        const onClick = (event) => {
          event.stopPropagation();
          if (params.row.paymentMethod !== 'COD') {
            window.open(params.row.paymentMethod === 'PAY_LATER' ? params.row.quotationUrl : params.row.paymentUrl, '_blank');
          }
        };
        return (
          <Button variant="outlined" color="info" onClick={onClick}>
            {params.row.paymentMethod === 'PAY_LATER' ? '30 Days Term' : params.row.paymentMethod}
          </Button>
        );
      }
    },
    {
      field: 'action2',
      headerName: '',
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

  const gridClick = (params, event, details) => {
    props.setSelectedOrder(null);
    let selectedData = params['row'];
    props.setStatusCount(params.row.orderItems.length);
    setOrderId(selectedData.id);
  };
  useEffect(() => {
    if (orderId) {
      fetchData();
      setOrderId('');
    }
  }, [orderId]);
  useEffect(() => {
    if (data) {
      const steps = data['data']['orderStatus'];
      props.setSelectedOrder(data['data']);
      props.setOrderSteps(steps);
    }
  }, [data]);

  return (
    <Box sx={{ width: '100%', mt: 1 }}>
      <Grid container>
        <Grid item xs={12}>
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
