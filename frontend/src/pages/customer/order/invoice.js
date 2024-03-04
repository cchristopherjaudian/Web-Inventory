import { Grid, Button, Typography, Paper } from '@mui/material';
import customaxios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const serviceId = process.env.REACT_APP_BASE_URL;

const Invoice = (props) => {
  const { token } = useSelector((state) => state.token.token);
  const router = useNavigate();

  const axios = customaxios.create({
    baseURL: serviceId,
    timeout: 10000,
    headers: {
      Authorization: token ? token : ''
    }
  });
  const cancelOrder = async (e) => {
    e.preventDefault();

    const forCancellation = await Swal.fire({
      icon: 'warning',
      title: 'Confirmation',
      text: 'Are you sure you want to proceed in cancelling your order?',
      showCancelButton: true,
      confirmButtonText: 'Yes'
    });

    if (!forCancellation.isConfirmed) return false;

    const { data: responseData } = await axios.patch(`/orders/cancellation/${props?.orderInfo.id}`);
    if (responseData?.code === 'DATA_MODIFIED') router('/history');
  };

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
          <Typography variant="h4">Total: ₱{Number(totalAmount).toLocaleString()}</Typography>
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
                  <TableCell>Item</TableCell>
                  <TableCell>Cost</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.orderInfo['orderItems']?.length > 0 &&
                  props.orderInfo['orderItems']?.map((cart, index) => {
                    return (
                      <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">
                          {cart.products.name}
                        </TableCell>
                        <TableCell>₱{Number(cart.products.price).toLocaleString()}</TableCell>
                        <TableCell>{cart.quantity}</TableCell>
                        <TableCell>₱{Number(cart.quantity * cart.products.price).toLocaleString()}</TableCell>
                      </TableRow>
                    );
                  })}
                <TableRow>
                  <TableCell colSpan={4}></TableCell>
                </TableRow>

                <TableRow>
                  <TableCell colSpan={2}>
                    <Typography variant="h5">Notes</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">Subtotal</Typography>
                  </TableCell>
                  <TableCell>₱{Number(totalAmount).toLocaleString()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell rowSpan={4} colSpan={2}>
                    Some Notes...
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="h5">Deposit</Typography>
                  </TableCell>
                  <TableCell>₱00.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="h5">Subject to change</Typography>
                  </TableCell>
                  <TableCell>₱00.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="h5">Subject to change</Typography>
                  </TableCell>
                  <TableCell>₱00.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4}></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>
                    <Typography variant="h4">Payment Info</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h4">Total</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h4"> ₱{Number(totalAmount).toLocaleString()}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Typography variant="body1">Account Name</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">
                          {profile['businessName']
                            ? profile['businessName']
                            : profile['firstname'] + ' ' + profile['middlename'] + ' ' + profile['lastname']}
                        </Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Typography variant="body1">Invoice No</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">{props.orderInfo['id']}</Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Typography variant="body1">Mode of Payment</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">{props.orderInfo['paymentMethod']}</Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <Typography variant="h4">Terms and Conditions</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="body1">
                      By paying this invoice, you accept that you are satisified with provided work and have nomore correnctions
                    </Typography>
                    <Typography variant="body1">The payment should be made within 15 banking days</Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Invoice;
