
import {
    Button,
    Grid,
    TextField,
    Box,
    Typography,
    Paper
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
const Header = () => {

    return (
        <Box>
            <Grid container spacing={1.5}>
                <Grid item xs={12}>
                    <Typography variant="h2" align="center">Purchase Quotation</Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Grid container spacing={1} direction="row" justify="center" alignItems="center">
                        <Grid item xs={2}>
                            <img src='https://www.placehold.co/100' alt='test x' />
                        </Grid>

                        <Grid item xs={2} justifyContents="center" alignItems="center">
                            <Typography variant="h6">Requester Name</Typography>
                            <Typography variant="h6">Email Address</Typography>
                            <Typography variant="h6">Contact No.</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="h6">Requester Name</Typography>
                            <Typography variant="h6">Email Address</Typography>
                            <Typography variant="h6">Contact No.</Typography>
                        </Grid>

                    </Grid>
                </Grid>
                <Grid item xs={12} md={3}>
                    <TableContainer component={Paper}>
                        <Table aria-label="pr table">
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={2}>Purchase Order</TableCell>
                                </TableRow>
                                <TableRow sx={{backgroundColor: '#D1EAFF'}}>
                                    <TableCell>Purchase ID</TableCell>
                                    <TableCell>Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow
                                    key={1}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        0000010101
                                    </TableCell>
                                    <TableCell>2023-11-01</TableCell>

                                </TableRow>

                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={12} md={3}>

                </Grid>
            </Grid>
        </Box>
    );
}

export default Header;