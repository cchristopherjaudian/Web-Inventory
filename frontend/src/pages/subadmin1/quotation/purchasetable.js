import { Button, Grid, TextField, Box, Typography, Paper, ListItemText } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';

const PurchaseTable = (props) => {
  console.log(props);
  const cartList = props.orderList;
  const [filledCart, setFilledCart] = useState([]);
  function updateProductProperty(code, update) {
    const updatedProducts = filledCart.map((p) => {
      if (p.products.code === code) {
        return { ...p, 'PrCustomPrices':update };
      }
      return p;
    });
    setFilledCart(updatedProducts);
    props.updateProductProperty(code,update);
  }
  useEffect(()=>{
    if(cartList.length > 0){
      setFilledCart(cartList);
    }
  },[cartList])
  return (
    <Grid container>
      <Grid item xs={12} sx={{ pr: 1.5 }}>
        <TableContainer component={Paper}>
          <Table aria-label="pr table">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#D1EAFF' }}>
                <TableCell>Code</TableCell>
                <TableCell>Product Description</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price per Unit</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filledCart?.length > 0 &&
                filledCart?.map((cart, index) => {
                  return (
                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        {cart.products.code}
                      </TableCell>
                      <TableCell>{cart.products.name}</TableCell>
                      <TableCell>{cart.quantity}</TableCell>
                      <TableCell>₱<ListItemText
                        sx={{ display: 'flex', justifyContent: 'flex-start' }}
                        primary={
                          <TextField
                            name={cart.products.code}
                            fullWidth
                            id={cart.products.code}
                            label="Unit Price"
                            value={cart.PrCustomPrices ? cart.PrCustomPrices : 0}
                            onChange={(e) => updateProductProperty(cart.products.code, Number(e.target.value))}
                          />
                        }
                      /></TableCell>
                      <TableCell>₱{cart.quantity * cart.PrCustomPrices}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default PurchaseTable;
