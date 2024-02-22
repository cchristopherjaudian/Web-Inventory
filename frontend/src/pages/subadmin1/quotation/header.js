import { Button, Grid, TextField, Box, Typography, Paper } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useSelector } from 'react-redux';

const Header = (props) => {
  const customerInfo = props?.customerInfo;
  return (
    <Box>
      <Grid container spacing={1.5} style={{ padding: '20px' }}>
        <Grid item xs={12} style={{ marginBottom: '20px' }}>
          <Typography variant="h2" align="center">
            Purchase Quotation
          </Typography>
        </Grid>
        <Grid container spacing={1.5}>
          <Grid item xs={12} md={6} spacing={1} direction="row" justify="center" alignItems="center">
            <Box sx={{ display: 'inline-flex', flexDirection: 'row' }}>
              <img
                style={{ maxWidth: '120px', maxHeight: 'auto' }}
                src={props.customerInfo.photoUrl || '/images/example.jpg'}
                alt="test x"
              />
              <div style={{ marginLeft: '20px' }}>
                <Typography variant="h6">Requester Name: {customerInfo.fullName}</Typography>
                <Typography variant="h6">Email Address: {customerInfo.emailAddress}</Typography>
                <Typography variant="h6">Contact No: </Typography>
              </div>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <TableContainer component={Paper}>
              <Table aria-label="pr table">
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={2}>Purchase Order</TableCell>
                  </TableRow>
                  <TableRow sx={{ backgroundColor: '#D1EAFF' }}>
                    <TableCell>Purchase ID</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={1} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {props?.orderInfo?.groupNo}
                    </TableCell>
                    <TableCell>{props?.orderInfo?.dateRequested?.substring(0, 10)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        {/* <Grid item xs={12} md={3}></Grid> */}
      </Grid>
    </Box>
  );
};

export default Header;
