import AccountTable from './AccountTable';
import MainCard from 'components/MainCard';
import { Grid, FormControl, InputAdornment, OutlinedInput } from '@mui/material';
import { SearchOutlined } from '@ant-design/icons';

export default function Account() {
    return (
        <MainCard title="Account">
            <Grid container justifyContent="flex-end" sx={{mt:-3}}>
                <Grid item xs={3}>
                    <FormControl sx={{ width: { xs: '100%' } }}>
                        <OutlinedInput
                            size="small"
                            id="header-search"
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchOutlined />
                                </InputAdornment>
                            }
                            aria-describedby="header-search-text"
                            inputProps={{
                                'aria-label': 'weight'
                            }}
                            placeholder="Search"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>

                    <AccountTable />
                </Grid>
            </Grid>
        </MainCard>
    );
}