import { useMediaQuery } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { useLocation } from 'react-router-dom';
import { FacebookOutlined, InstagramOutlined, TwitterOutlined } from '@ant-design/icons';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Footer = () => {
  const theme = useTheme();
  const location = useLocation();
  const matchUpMD = useMediaQuery(theme.breakpoints.up('lg'));
  return (
    <Box
      component="footer"
      sx={{
        // ...((location.pathname.startsWith('/home') && matchUpMD) && { position: 'fixed' }),
        // ...((location.pathname.startsWith('/home') && matchUpMD) && { bottom: 0 }),
        width: '100%',
        backgroundColor: (theme) => (theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800]),
        p: 1
      }}
    >
      <Container maxWidth="sm">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Oxiaire, is a manufacturer of advanced gas separation systems, which specializes in the manufacture and supply of on-site PSA
              Oxygen generation plants to domestic and international markets. Our medical oxygen generator is designed with the highest
              possible standards complying with ISO 9001:2015 standards WHO technical specification for Oxygen PSA plants
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              1260 Maharlika Highway, Isabang, Lucena City
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: oxiairegasenterprises@gmail.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: 042 710 2833 | 042 373 7077
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Follow Us
            </Typography>
            <Link href="https://www.facebook.com/" color="inherit">
              <FacebookOutlined />
            </Link>
            <Link href="https://www.instagram.com/" color="inherit" sx={{ pl: 1, pr: 1 }}>
              <InstagramOutlined />
            </Link>
            <Link href="https://www.twitter.com/" color="inherit">
              <TwitterOutlined />
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
              Oxiaire Gas Enterprises
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
