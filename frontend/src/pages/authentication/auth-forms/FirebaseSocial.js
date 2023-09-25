import useAxios from 'hooks/useAxios';
import useAxiosBackup from 'hooks/useAxiosBackup';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery, Button, Stack } from '@mui/material';
import Google from 'assets/images/icons/google.svg';
import { setToken, setAuth, setAdmin, setAdminType } from 'store/reducers/token';
import { setFirstName, setMiddleName, setLastName, setAddress } from 'store/reducers/profile';

const FirebaseSocial = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { token } = useSelector((state) => state.menu);
  const [newToken, setNewToken] = useState('');
  const [newData, setNewData] = useState(false);
  const [user, setUser] = useState('');
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  const { data, loading, error, fetchData } = useAxios('accounts', 'POST', { email: 'customer@gmail.com' });
  const { profile, profileLoading, profileError, fetchProfile } = useAxiosBackup('profiles/auth', 'GET');

  useEffect(() => {
    if (data) {
      console.log(data);
      const createToken = data['data']['token'];
      dispatch(setToken({ token: createToken }));
      setNewData(data['data']['newData']);
      setNewToken(createToken);
    }
  }, [data]);
  useEffect(() => {
    if (newToken) {
      if (newData) {
        navigate('/register', { replace: true })
      } else {
        fetchProfile();
      }

    }
  }, [newToken]);
  useEffect(() => {
    if (profile) {

      const adminTypes = {
        'ADMIN': 0,
        'SUB_1': 1,
        'SUB_2': 2
      };

      const newData = data['data']['newData'];
      const accountType = profile['data']['account']['accountType'];
      dispatch(setAuth({ authenticated: true }));
      dispatch(setFirstName({ firstName: profile['data']['firstname'] }));
      dispatch(setMiddleName({ middleName: profile['data']['middlename'] }));
      dispatch(setLastName({ lastName: profile['data']['lastname'] }));
      dispatch(setAddress({ address: profile['data']['address'] }));

      if (accountType in adminTypes) {
        dispatch(setAdminType({ adminType: adminTypes[accountType] }));
        dispatch(setAdmin({ isadmin: true }));
        navigate('/', { replace: true });
      } else if (accountType === 'CUSTOMER') {
        dispatch(setAdmin({ isadmin: false }));
        navigate('/home', { replace: true });
      }

    }

  }, [profile]);

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
        onClick={() => fetchData()}
      >
        {!matchDownSM && 'Sign in with Google'}
      </Button>
      
    </Stack>
  );
};

export default FirebaseSocial;
