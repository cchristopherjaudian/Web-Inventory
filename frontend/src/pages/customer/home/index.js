import Footer from 'layout/MainLayout/Footer/index';
import { Grid, Paper, Typography, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import useAxios from 'hooks/useAxios';
import { setCart } from 'store/reducers/cart';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { data, fetchData } = useAxios('carts/auth', 'GET', null, false);
  const isBusiness = useSelector((state) => state.token.customertype.customertype);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (data) {
      if (data['data'].length > 0) dispatch(setCart(data['data']));
    }
  }, [data]);

  return (
    <>
      <Grid container sx={{ height: '70%' }}>
        <Grid item xs={12} sx={{ height: '100%' }}>
          <Paper
            elevation={10}
            sx={{
              bgcolor: '#FAFAFA',
              backgroundImage: `url('https://placehold.co/900')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              maskImage: 'linear-gradient(to left, transparent, black)',
              height: '100%'
            }}
          >
            <Grid container sx={{ height: '100%' }}>
              <Grid
                item
                xs={6}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 4,
                  mt: 2
                }}
              >
                <Typography
                  variant="h1"
                  component="div"
                  sx={{ color: '#2980b9', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  gutterBottom
                >
                  QUALITY and SAFETY
                </Typography>
                <Typography
                  variant="h1"
                  component="div"
                  sx={{ color: '#16a085', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  gutterBottom
                >
                  OUR PRIORITY
                </Typography>
                <Button variant="contained" size="large" onClick={() => navigate(isBusiness ? '/purchase/request' : '/shop')}>
                  Shop Now
                </Button>
              </Grid>
              <Grid item xs={6}></Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={10} sx={{ mt: -5, zIndex: 20 }}>
          <Paper elevation={10} sx={{ p: 4 }}>
            <Grid container spacing={5}>
              <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <img src="/asset/list.png" alt="list" />
                <Typography variant="h5" sx={{ mt: 2 }}>
                  PRODUCTS
                </Typography>
                <Typography variant="h6" sx={{ textAlign: 'justify', display: 'flex', justifyContent: 'center' }}>
                  lorem impsum lorem impsum lorem impsum
                </Typography>
              </Grid>
              <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <img src="/asset/customer-service.png" alt="service" />
                <Typography variant="h5" sx={{ mt: 2 }}>
                  SERVICES
                </Typography>
                <Typography variant="h6" sx={{ textAlign: 'justify', display: 'flex', justifyContent: 'center' }}>
                  lorem impsum lorem impsum lorem impsum
                </Typography>
              </Grid>
              <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <img src="/asset/routes.png" alt="routes" />
                <Typography variant="h5" sx={{ mt: 2 }}>
                  ROUTE SCHEDULE
                </Typography>
                <Typography variant="h6" sx={{ textAlign: 'justify', display: 'flex', justifyContent: 'center' }}>
                  lorem impsum lorem impsum lorem impsum
                </Typography>
              </Grid>
              <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <img src="/asset/statistics.png" alt="statistics" />
                <Typography variant="h5" sx={{ mt: 2 }}>
                  REPORTS
                </Typography>
                <Typography variant="h6" sx={{ textAlign: 'justify', display: 'flex', justifyContent: 'center' }}>
                  lorem impsum lorem impsum lorem impsum
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={12} sx={{ mt: 5 }}>
          <Footer />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
