import useAxios from 'hooks/useAxios';
import useAxiosBackup from 'hooks/useAxiosBackup';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery, Button, Stack } from '@mui/material';
import Google from 'assets/images/icons/google.svg';
import { setToken, setAuth, setAdmin, setAdminType, setCustomerType } from 'store/reducers/token';
import { setContact, setFirstName, setMiddleName, setLastName, setAddress, setAccType } from 'store/reducers/profile';

const FirebaseSocial = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { token } = useSelector((state) => state.menu);
  const [newToken, setNewToken] = useState('');
  const [newData, setNewData] = useState(false);
  const [mobile, setMobile] = useState('');
  const [user, setUser] = useState('');
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  const { data, fetchData } = useAxios('accounts/login', 'POST', { username: mobile, password: 'Password001*' });
  const { profile, fetchProfile } = useAxiosBackup('profiles/auth', 'GET');

  useEffect(() => {
    if (mobile) {
      fetchData();
      setMobile('');
    }
  }, [mobile]);
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
        navigate('/register', { replace: true });
      } else {
        fetchProfile();
      }
    }
  }, [newToken]);
  useEffect(() => {
    if (profile) {
      const adminTypes = {
        ADMIN: 0,
        SUB_1: 1,
        SUB_2: 2
      };
      const customerTypes = {
        CUSTOMER: 0,
        BUSINESS: 1
      };
      const newData = data['data']['newData'];
      const accountType = profile['data']['account']['accountType'];
      dispatch(setAuth({ authenticated: true }));
      dispatch(setAccType({ accType: accountType }));
      dispatch(setFirstName({ firstName: profile['data']['firstname'] }));
      dispatch(setMiddleName({ middleName: profile['data']['middlename'] }));
      dispatch(setLastName({ lastName: profile['data']['lastname'] }));
      dispatch(setAddress({ address: profile['data']['address'] }));
      dispatch(setContact({ contact: '111' }));
      if (accountType in adminTypes) {
        dispatch(setAdminType({ adminType: adminTypes[accountType] }));
        dispatch(setAdmin({ isadmin: true }));
        navigate('/', { replace: true });
      } else {
        const customerType = profile['data']['account']['accountType'];
        dispatch(setCustomerType({ customertype: customerTypes[customerType] }));
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
        onClick={() => setMobile('09272630001')}
      >
        {!matchDownSM && 'Sign in as Customer'}
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        fullWidth={!matchDownSM}
        startIcon={<img src={Google} alt="Google" />}
        onClick={() => setMobile('09272630002')}
      >
        {!matchDownSM && 'Sign in as Business'}
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        fullWidth={!matchDownSM}
        startIcon={<img src={Google} alt="Google" />}
        onClick={() => setMobile('09272630003')}
      >
        {!matchDownSM && 'Sign in as SUB1'}
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        fullWidth={!matchDownSM}
        startIcon={<img src={Google} alt="Google" />}
        onClick={() => setMobile('09272630004')}
      >
        {!matchDownSM && 'Sign in as SUB2'}
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        fullWidth={!matchDownSM}
        startIcon={<img src={Google} alt="Google" />}
        onClick={() => setMobile('09272630005')}
      >
        {!matchDownSM && 'Sign in as ADMIN'}
      </Button>
    </Stack>
  );
};

export default FirebaseSocial;
