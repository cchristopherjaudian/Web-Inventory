import Option from "./option";
import {Grid} from "@mui/material";

const Payment = () => {
    return (<Grid container spacing = {1}>
        <Grid item xs = {12}>
            <Option name="Cash on Delivery" description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id dolor id nunc rutrum ultricies cursus eu dolor. Fusce mollis congue massa, in elementum nisi tincidunt eu. "/>
        </Grid>
        <Grid item xs = {12}>
        <Option name="GCash" description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id dolor id nunc rutrum ultricies cursus eu dolor. Fusce mollis congue massa, in elementum nisi tincidunt eu. "/>
        </Grid>
        <Grid item xs = {12}>
        <Option name="Bank Transfer" description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id dolor id nunc rutrum ultricies cursus eu dolor. Fusce mollis congue massa, in elementum nisi tincidunt eu. "/>
        </Grid>
    </Grid>  );
}
 
export default Payment;