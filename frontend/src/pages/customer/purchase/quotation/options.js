import {
    Button,
    Grid,
    TextField,
    Box,
    Typography
} from '@mui/material';
import { FilePdfOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';
const Options = (props) => {
    const navigate = useNavigate();
    return (<Grid container mt={3} spacing={5} sx={{display:'flex', justifyContent:'space-between'}}>
        <Grid item xs={12} md={5} >
        <Typography variant="h4">Note</Typography>
        <Typography variant="h6">Payment shall be 30 days upon receipt of the above item(s)</Typography>
        </Grid>
        <Grid item xs={12} md={3} >
            <Typography variant="h4">Save As</Typography>
            <Grid container>
                <Grid item xs={12} sx={{ display: 'flex' }} gap={1}>
                    <Button sx={{ width: '50%' }} component="label" variant="outlined" color="info" startIcon={<FilePdfOutlined />}>
                        PNG
                    </Button>
                    <Button sx={{ width: '50%' }} component="label" variant="outlined" color="warning" startIcon={<FilePdfOutlined />}>
                        PDF
                    </Button>
                    <Button sx={{ width: '50%' }} component="label" variant="outlined" startIcon={<FilePdfOutlined />}>
                        PRINT
                    </Button>
                </Grid>
            </Grid>

        </Grid>
        <Grid item xs={12} md={4}>
            <Button variant="contained" color="primary" fullWidth onClick={()=>navigate('/purchase/order/' + props.quoteInfo.groupNo,{replace:true})}>Continue to Purchase Order</Button>
            <Button variant="outlined" color="primary" sx={{ mt: 2 }} fullWidth onClick={()=>navigate('/purchase/request',{replace:true})}>Make another request</Button>
        </Grid>


    </Grid>);
}

export default Options;