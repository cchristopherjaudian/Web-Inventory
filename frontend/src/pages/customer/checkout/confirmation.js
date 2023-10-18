import MainCard from "components/MainCard";
import { Grid, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Confirmation = () => {
    const navigate = useNavigate();
    return (<MainCard>
        <Grid container spacing={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Grid item xs={12}>

            </Grid>
            <Typography variant="h3">THANKS FOR YOUR ORDER</Typography>
            <Typography variant="caption" mt = {3}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id dolor id nunc rutrum ultricies cursus eu dolor. Fusce mollis congue massa, in elementum nisi tincidunt eu. Quisque congue lorem quis est sodales maximus. Vestibulum tellus ligula, porttitor quis arcu sit amet, pellentesque mollis nulla. Duis laoreet, odio at blandit elementum, arcu metus eleifend odio, et posuere metus felis id lorem. Sed efficitur sapien nibh, eu pretium enim convallis et. Vestibulum ligula dui, eleifend sit amet nisi at, fermentum volutpat magna.</Typography>
            <Grid item xs={12} mt={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} gap = {2}>
                <Button variant="contained" color="success" onClick = {()=> navigate('/shop',{replace:true})}>Go Back Shopping</Button>
                <Button variant="contained" color="primary" onClick = {()=> navigate('/history',{replace:true})}>View Invoices</Button>
            </Grid>
        </Grid>
    </MainCard>);
}

export default Confirmation;