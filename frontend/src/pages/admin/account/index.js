import AccountTable from './AccountTable';
import MainCard from 'components/MainCard';
import { Button,Grid, FormControl, InputAdornment, OutlinedInput } from '@mui/material';
import { UserAddOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
export default function Account() {
   
    return (
        <MainCard title="Account">
            <Grid container justifyContent="flex-end" sx={{mt:-3}}>
                <Grid item xs={3}>
                    <FormControl sx={{display:'flex', justifyContent:'end'}}>
                        <Button component={Link} to="/account/register" startIcon={<UserAddOutlined/>} variant="contained">Add New Account</Button>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <AccountTable acctype />
                </Grid>
            </Grid>
        </MainCard>
    );
}