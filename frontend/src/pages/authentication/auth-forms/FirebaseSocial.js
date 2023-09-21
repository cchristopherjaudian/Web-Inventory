import useAxios from 'hooks/useAxios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery, Button, Stack } from '@mui/material';
import Google from 'assets/images/icons/google.svg';
import { setToken, setAuth, setAdmin, setAdminType } from 'store/reducers/token';

const FirebaseSocial = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { token } = useSelector((state) => state.menu);
  const [newToken, setNewToken] = useState('');
  const [user, setUser] = useState('');
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  const { data, loading, error, fetchData } = useAxios('accounts', 'POST', { email: 'admin@gmail.com' });

  useEffect(() => {
    if (data) {
      const newData = data['data']['newData'];
      const createToken = data['data']['token'];
      const isadmin = true;
      setNewToken(createToken);
      dispatch(setAdmin({ isadmin: false }));
      dispatch(setAuth({ authenticated: true }));
      dispatch(setToken({ token: createToken }));

      if (!newData) {
        navigate(isadmin ? '/' : '/home', { replace: true })
      } else {
        navigate('/register', { replace: true })
      }
    }
  }, [data]);
  const mockLogin = (type) => {
    dispatch(setAuth({ authenticated: true }));
    const adminTypes = {
      'ADMIN': 0,
      'SUB_1': 1,
      'SUB_2': 2
    };
   
    if (type in adminTypes) {
      dispatch(setAdminType({ adminType: adminTypes[type] }));
      dispatch(setAdmin({ isadmin: true }));
      navigate('/', { replace: true });
    } else if (type === 'CUSTOMER') {
      dispatch(setAdmin({ isadmin: false }));
      navigate('/home', { replace: true });
    }

  }
  return (
    <Stack
      direction="row"
      spacing={matchDownSM ? 1 : 2}
      justifyContent={matchDownSM ? 'space-around' : 'space-between'}
      sx={{ '& .MuiButton-startIcon': { mr: matchDownSM ? 0 : 1, ml: matchDownSM ? 0 : -0.5 } }}
    >
      <Button
        variant="outlined"
        color="secondary"
        fullWidth={!matchDownSM}
        startIcon={<img src={Google} alt="Google" />}
        onClick={() => mockLogin('ADMIN')}
      >
        {!matchDownSM && 'Sign in Admin  (Test)'}
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        fullWidth={!matchDownSM}
        startIcon={<img src={Google} alt="Google" />}
        onClick={() => mockLogin('SUB_1')}
      >
        {!matchDownSM && 'Sign in SubAdmin1  (Test)'}
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        fullWidth={!matchDownSM}
        startIcon={<img src={Google} alt="Google" />}
        onClick={() => mockLogin('SUB_2')}
      >
        {!matchDownSM && 'Sign in SubAdmin2  (Test)'}
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        fullWidth={!matchDownSM}
        startIcon={<img src={Google} alt="Google" />}
        onClick={() => mockLogin('CUSTOMER')}
      >
        {!matchDownSM && 'Sign in Customer(Test)'}
      </Button>
    </Stack>
  );
};

export default FirebaseSocial;
