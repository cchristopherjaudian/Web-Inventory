import Grid from '@mui/material/Grid';
import { Button, ButtonGroup, FormControl, InputAdornment, OutlinedInput } from '@mui/material';
import { SearchOutlined } from '@ant-design/icons';

const Searchbar = (props) => {
    return (<Grid item xs={12} sx={{ display: 'flex' }} gap={1}>
        <FormControl sx={{ width: { xs: '100%', ml: 1 } }}>
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
                placeholder="Filter Order Notice"
            />
        </FormControl>
    </Grid>);
}

export default Searchbar;