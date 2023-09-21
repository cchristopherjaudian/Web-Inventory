import { Box, FormControl, InputAdornment, OutlinedInput } from '@mui/material';
import { SearchOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
const Search = () => {
  const isadmin = useSelector((state) => state.token.isadmin.isadmin);
  return (
    isadmin ?
      <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }}>
        <FormControl sx={{ width: { xs: '100%', md: 224 } }}>
          <OutlinedInput
            size="small"
            id="header-search"
            startAdornment={
              <InputAdornment position="start" sx={{ mr: -0.5 }}>
                <SearchOutlined />
              </InputAdornment>
            }
            aria-describedby="header-search-text"
            inputProps={{
              'aria-label': 'weight'
            }}
            placeholder="Ctrl + K"
          />
        </FormControl>
      </Box>
      :
      <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }}></Box>
  );

};

export default Search;
