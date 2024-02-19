import { Grid, Button } from '@mui/material';
import MainCard from 'components/MainCard';
import OrderTable from "./OrderTable";
import Searchbar from "./searchbar";

const PurchaseRequest = () => {
    return (
        <MainCard title="Purchase Request List">
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Searchbar />
                </Grid>
                <Grid item xs={12}>
                    <OrderTable />
                </Grid>
            </Grid>
        </MainCard>);
}

export default PurchaseRequest;