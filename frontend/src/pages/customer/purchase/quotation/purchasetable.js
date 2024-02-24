import { Button, Grid, TextField, Box, Typography, Paper } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const PurchaseTable = (props) => {
  const cartList = props.quoteInfo.list;
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
                <TableCell>Unit Price</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartList?.length > 0 &&
                cartList?.map((cart, index) => {
                  return (
                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        {cart.products.code}
                      </TableCell>
                      <TableCell>{cart.products.name}</TableCell>
                      <TableCell>{cart.quantity}</TableCell>
                      <TableCell>₱{cart?.PrCustomPrices.price}</TableCell>
                      <TableCell>₱{cart.quantity * cart?.PrCustomPrices.price}</TableCell>
                    </TableRow>
                  );
                })}

              <TableRow key={2} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row" colSpan={3} sx={{ backgroundColor: '#D1EAFF' }}></TableCell>
                <TableCell colSpan={3}>Subtotal: ₱{props.quoteInfo.totalAmount}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default PurchaseTable;
