import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const InventoryTable = (props) => {
  const [productRows, setProductRows] = useState([]);
  const navigate = useNavigate();
  const token = useSelector((state) => state.token.token);

  const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 10000,
    headers: {
      Authorization: token ? token.token : ''
    }
  });

  const columns = [
    {
      field: 'code',
      headerName: 'Product Code',
      editable: false,
      flex: 1
    },
    {
      field: 'name',
      headerName: 'Name',
      editable: false,
      flex: 1
    },
    {
      field: 'category',
      headerName: 'Category',
      editable: false,
      flex: 1
    },
    {
      field: 'price',
      headerName: 'Price',
      editable: false,
      flex: 1
    },
    {
      field: 'size',
      headerName: 'Size',
      editable: false,
      flex: 1
    },
    {
      field: 'content',
      headerName: 'Content',
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
          Swal.fire({
            icon: 'question',
            title: 'Product Management',
            text: 'Are you sure you want to delete this product?',
            showCancelButton: true,
            confirmButtonText: 'Yes'
          }).then(async (result) => {
            if (result.isConfirmed) {
              // const inventories = await axiosClient.get('/inventories');
              // console.log('id', params.row);
            }
          });
        };

        return (
          <Button endIcon={<DeleteOutlined />} variant="outlined" color="error" onClick={onClick}>
            Delete
          </Button>
        );
      }
    }
  ];
  const gridClick = (params, event, details) => {
    let selectedData = params['row'];
    let uri = '/inventories/' + selectedData.id;
    navigate(uri);
  };
  useEffect(() => {
    setProductRows(props.products);
  }, [props.products]);
  const inventoryList = productRows;
  return (
    <Box sx={{ width: '100%' }}>
      <Grid container>
        <Grid item xs={12}>
          <DataGrid
            autoHeight
            rows={inventoryList}
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

export default InventoryTable;
