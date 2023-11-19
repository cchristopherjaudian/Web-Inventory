import MainCard from 'components/MainCard';
import { Box, Grid, Typography } from '@mui/material';

const About = () => {
  return (
    <MainCard>
      <Grid container spacing={4} sx={{ mt: 3, mb: 3 }}>
        <Grid item xs={12} align="center">
          <Typography variant="h1" sx={{ color: '#2980b9' }}>
            ABOUT US
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ mt: 3, mb: 3 }}>
        <Grid item xs={12} lg={7} align="center" sx={{ textAlign: 'justify', pr: 5 }}>
          <Typography variant="h6" sx={{ ml: 3 }}>
            Oxiaire, is a manufacturer of advanced gas separation systems, which specializes in the manufacture and supply of on-site PSA
            Oxygen generation plants to domestic and international markets. Our medical oxygen generator is designed with the highest
            possible standards complying with ISO 9001:2015 standards WHO technical specification for Oxygen PSA plants.
          </Typography>
          <Typography variant="h6" sx={{ ml: 3, mt: 2 }}>
            Oxiaire Gas Enterprises has successfully supplied, installed and is operating turn-key custom Medical Oxygen PSA units to the
            most prestigious hospital in Quezon Province and the sub-continent
          </Typography>

          <Typography variant="h4" sx={{ ml: 3, mt: 2 }}>
            Unique Features
          </Typography>
          <Typography variant="h6" sx={{ ml: 3, mt: 2 }}>
            Our Oxygen PSA generating system delivers constant oxygen of 93.3% purity through PSA filtration, a unique process that
            separates oxygen from compressed air. The gas is then conditioned and filtered before being stored in a budder tank to be piped
            directly into the hospital on demand
          </Typography>

          <Typography variant="h6" sx={{ ml: 3, mt: 2 }}>
            We specialize in the supply of on-site gas generation to the domestic and international markets. The systems we introduce enable
            medical facilities to be self-sufficient in generating the purest oxygen for years to come.
          </Typography>

          <Typography variant="h6" sx={{ ml: 3, mt: 2 }}>
            We designed and manufactured Pressure Swing Absorption (PSA) Medical Oxygen plants and capacity is sized as per the requirement
            of the hospital&apos;s existing facilities including Medical oxygen, Special Gases and Other Hospital related equipment.
          </Typography>
        </Grid>

        <Grid item xs={12} lg={5}>
          <Box component="img" src="https://i.ibb.co/9hB9JCG/about-us.jpg" alt="About Us" width={600} height={400} sx={{ mr: 3, ml: 3 }} />
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default About;
