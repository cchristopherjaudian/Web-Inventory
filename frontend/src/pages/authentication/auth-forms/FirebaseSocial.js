import useAxios from 'hooks/useAxios';
import useAxiosBackup from 'hooks/useAxiosBackup';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery, Button, Stack } from '@mui/material';
import Google from 'assets/images/icons/google.svg';
import { setToken, setAuth, setAdmin, setAdminType } from 'store/reducers/token';
import { setFirstName, setMiddleName, setLastName, setAddress,setAccType } from 'store/reducers/profile';

const FirebaseSocial = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { token } = useSelector((state) => state.menu);
  const [newToken, setNewToken] = useState('');
  const [newData, setNewData] = useState(false);
  const [emailLogin, setEmailLogin] = useState('');
  const [user, setUser] = useState('');
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  const { data, fetchData } = useAxios('accounts', 'POST', { email: emailLogin });
  const { profile, fetchProfile } = useAxiosBackup('profiles/auth', 'GET');

  useEffect(() => {
    if (emailLogin) {
      fetchData();
      setEmailLogin('');
    }
  }, [emailLogin]);
  useEffect(() => {
    if (data) {
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
      dispatch(setAccType({ accType: accountType }));
      dispatch(setFirstName({ firstName: profile['data']['firstname'] }));
      dispatch(setMiddleName({ middleName: profile['data']['middlename'] }));
      dispatch(setLastName({ lastName: profile['data']['lastname'] }));
      dispatch(setAddress({ address: profile['data']['address'] }));

      if (accountType in adminTypes) {
        dispatch(setAdminType({ adminType: adminTypes[accountType] }));
        dispatch(setAdmin({ isadmin: true }));
        navigate('/', { replace: true });
      } else {
        dispatch(setAdmin({ isadmin: false }));
        navigate('/home', { replace: true });
      }

    }

  }, [profile]);

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
        onClick={() => setEmailLogin('customer@gmail.com')}
      >
        {!matchDownSM && 'Sign in as Customer'}
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        fullWidth={!matchDownSM}
        startIcon={<img src={Google} alt="Google" />}
        onClick={() => setEmailLogin('business@gmail.com')}
      >
        {!matchDownSM && 'Sign in as Business'}
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        fullWidth={!matchDownSM}
        startIcon={<img src={Google} alt="Google" />}
        onClick={() => setEmailLogin('sub1@gmail.com')}
      >
        {!matchDownSM && 'Sign in as SUB1'}
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        fullWidth={!matchDownSM}
        startIcon={<img src={Google} alt="Google" />}
        onClick={() => setEmailLogin('sub2@gmail.com')}
      >
        {!matchDownSM && 'Sign in as SUB2'}
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        fullWidth={!matchDownSM}
        startIcon={<img src={Google} alt="Google" />}
        onClick={() => setEmailLogin('admin@gmail.com')}
      >
        {!matchDownSM && 'Sign in as ADMIN'}
      </Button>
    </Stack>
  );
};

export default FirebaseSocial;
