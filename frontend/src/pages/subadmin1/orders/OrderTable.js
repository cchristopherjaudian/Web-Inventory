import firebaseConfig from 'config/firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import { DataGrid } from '@mui/x-data-grid';
import { RightOutlined, MessageOutlined } from '@ant-design/icons';
import { Box, Button, Grid } from '@mui/material';
import useAxios from 'hooks/useAxios';
import useInventoryAxios from 'hooks/useInventoryAxios';
import { useState, useEffect, forwardRef } from 'react';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';

let messageRef = null;
const OrderTable = (props) => {
  const myMobile = useSelector((state) => state.profile.contact.contact);
  const myPhoto = useSelector((state) => state.profile.photoUrl.photoUrl);
  const fn = useSelector((state) => state.profile.firstName.firstName);
  const ln = useSelector((state) => state.profile.lastName.lastName);
  const myName = fn + ' ' + ln;
  const [customer, setCustomer] = useState({});
  const [gridRows, setGridRows] = useState([]);
  const [orderId, setOrderId] = useState('');
  const [paidOrder, setPaidOrder] = useState('');
  const { data, fetchData } = useAxios('orders/' + orderId, 'GET', null, false);
  const { inventoryData, inventoryFetchData } = useInventoryAxios('orders/' + paidOrder, 'PATCH', { status: 'PAID', refNo: '1' }, true);

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
      console.log(props.orders);
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
      valueGetter: (params) => `${params.row.firstname} ${params.row.middlename} ${params.row.lastname}`
    },
    {
      field: 'status',
      headerName: 'Order Status',
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
      flex: 1,
      renderCell: (params) => {
        const onClick = (event) => {
          event.stopPropagation();
          if (params.row.paymentMethod !== 'COD')
            window.open(params.row.paymentMethod === 'PAY_LATER' ? params.row.quotationUrl : params.row.paymentUrl, '_blank');
        };
        return (
          <Button variant="outlined" color="info" onClick={onClick}>
            {params.row.paymentMethod === 'PAY_LATER' ? '30 Days Term' : params.row.paymentMethod}
          </Button>
        );
      }
    },
    {
      field: 'action3',
      headerName: 'Reminder',
      sortable: false,
      width: 150,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const onClick = (event) => {
          event.stopPropagation();
          Swal.fire({
            icon: 'question',
            title: 'Reminder',
            text: 'Are you sure you want to send a reminder to this customer?',
            showCancelButton: true,
            confirmButtonText: 'Yes'
          }).then((result) => {
            if (result.isConfirmed) {
              let customerType = params.row.customerType === 'CUSTOMER' ? 'B2C' : 'B2B';
              let customerMobile = params.row.customerId;
              let cartItems = params.row.orderItems;
              const totalPrice = Object.keys(cartItems).length
                ? cartItems.reduce((sum, item) => {
                    return sum + item.quantity * parseFloat(item.products.price);
                  }, 0)
                : 0;
              let newMessage = {
                content: '',
                orderId: params.row.id,
                img: '',
                html: {
                  orderId: params.row.id,
                  price: totalPrice,
                  orderDate: params.row.createdAt.substring(0, 10)
                },
                time: new Date().toISOString(),
                src: myMobile,
                mobile: myMobile,
                name: myName,
                photoUrl: myPhoto
              };
              messageRef = database.ref(customerType + '/recipients/' + customerMobile + '/chat/messages/');
              messageRef.push(newMessage);
            }
          });
        };
        if (params.row.paymentMethod === 'PAY_LATER') {
          return (
            <Button endIcon={<MessageOutlined />} variant="contained" color="error" onClick={onClick}>
              Remind
            </Button>
          );
        }
      }
    },
    {
      field: 'action2',
      headerName: '',
      sortable: false,
      width: 150,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const onClick = (event) => {
          event.stopPropagation();
          Swal.fire({
            icon: 'question',
            title: 'Order Status',
            text: 'Are you sure you want to set this order as paid?',
            showCancelButton: true,
            confirmButtonText: 'Yes'
          }).then((result) => {
            if (result.isConfirmed) {
              setPaidOrder(params.row.id);
            }
          });
        };

        return (
          <Button endIcon={<RightOutlined />} variant="contained" color="success" onClick={onClick}>
            Set as Paid
          </Button>
        );
      }
    }
  ];

  function needsReminder(inputDateString) {
    let inputDate = new Date(inputDateString);
    let thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    thirtyDaysAgo.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);
    return inputDate.getTime() < thirtyDaysAgo.getTime();
  }

  const gridClick = (params, event, details) => {
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
