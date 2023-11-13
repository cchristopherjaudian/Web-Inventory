import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { useLocation } from 'react-router-dom';
import { FacebookOutlined, InstagramOutlined, TwitterOutlined } from "@ant-design/icons";
import { Box } from "@mui/material";



const Footer = () => {
    const location = useLocation();
    console.log(location.pathname);
    return (
        <Box
            component="footer"
            sx={{
                ...(location.pathname.startsWith('/home') && { position: 'fixed' }),
                ...(location.pathname.startsWith('/home') && { bottom: 0 }),
                width: '100%',
                backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[800],
                p: 1,
            }}
        >
            <Container maxWidth="sm">
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            About Us
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tincidunt sollicitudin turpis a aliquam. Duis porttitor venenatis cursus. Duis sodales nunc eget vehicula consequat. Morbi non euismod nisl. Vestibulum imperdiet laoreet ex a consequat. Sed sed sapien libero. Morbi condimentum ac nibh sed vestibulum
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
                        <Link
                            href="https://www.instagram.com/"
                            color="inherit"
                            sx={{ pl: 1, pr: 1 }}
                        >
                            <InstagramOutlined />
                        </Link>
                        <Link href="https://www.twitter.com/" color="inherit">
                            <TwitterOutlined />
                        </Link>
                    </Grid>
                </Grid>
                <Box mt={5}>
                    <Typography variant="body2" color="text.secondary" align="center">
                        {"Copyright © "}
                        <Link color="inherit" href="#">
                            Oxiaire Gas Enterprises
                        </Link>{" "}
                        {new Date().getFullYear()}
                        {"."}
                    </Typography>
                </Box>
            </Container>
        </Box>);
}

export default Footer;