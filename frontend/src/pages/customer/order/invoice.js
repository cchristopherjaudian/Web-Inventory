import { Grid, Button, Typography, Paper } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
const Invoice = (props) => {
  const profile = props.orderInfo['profile'];
  let totalAmount = props.orderInfo['orderItems'].reduce((sum, item) => {
    return sum + item.quantity * parseFloat(item.products.price);
  }, 0);
  return (
    <Grid container spacing={1} sx={{ pl: 3, pt: 5 }}>
      <Grid container>
        <Grid item xs={12} md={6}>
          <img src="/asset/oxiaire.png" alt="main-logo" width={300} height={150} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h1">Invoice</Typography>
          <Typography variant="h4" sx={{ mt: 2 }}>
            Number {props.orderInfo['id']}
          </Typography>
          <Typography variant="h4">Dated: {props.orderInfo['createdAt']?.substring(0, 10)}</Typography>
          <Typography variant="h4">Total: ₱{totalAmount}</Typography>
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h3" sx={{ pl: 4 }}>
            From
          </Typography>
          <Typography variant="h5" sx={{ pl: 4, mt: 3 }}>
            Oxiaire Gas Enterprises
          </Typography>
          <Typography variant="h5" sx={{ pl: 4 }}>
            Plant: 1576 Maharlika Highway
          </Typography>
          <Typography variant="h5" sx={{ pl: 4 }}>
            Office: 1260 Maharlika Highway, Isabang, Lucena City
          </Typography>
          <Typography variant="h5" sx={{ pl: 4 }}>
            Tax NUmber: 100090757
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container>
            <Grid item xs={9}>
              <Typography variant="h3">To</Typography>
              <Typography variant="h5" sx={{ mt: 3 }}>
                {profile['businessName']
                  ? profile['businessName']
                  : profile['firstname'] + ' ' + profile['middlename'] + ' ' + profile['lastname']}
              </Typography>
              <Typography variant="h5">{profile['address']}</Typography>
            </Grid>
            <Grid item xs={3} sx={{ pr: 3 }}>
              <img src={profile['photoUrl'] ? profile['photoUrl'] : 'https://placehold.co/400'} height={200} width={200} alt="user-dp" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
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
                {props.orderInfo['orderItems']?.length > 0 &&
                  props.orderInfo['orderItems']?.map((cart, index) => {
                    return (
                      <TableRow key={1} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">
                          {cart.products.code}
                        </TableCell>
                        <TableCell>{cart.products.name}</TableCell>
                        <TableCell>{cart.quantity}</TableCell>
                        <TableCell>₱{cart.products.price}</TableCell>
                        <TableCell>₱{cart.quantity * cart.products.price}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Invoice;
