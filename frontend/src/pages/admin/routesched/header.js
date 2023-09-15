import {
    Card,
    CardActionArea,
    CardContent,
    Grid,
    Stack,
    Typography
} from '@mui/material';

const Header = (props) => {
    return (
        <Grid item xs={6}>
            <CardActionArea component="a" href="#">
                <Card sx={{ display: 'flex', height: 95, borderLeftColor: 'error.main', borderLeftWidth: 5, borderLeftStyle: 'solid' }}>
                    <CardContent sx={{ flex: 1, ml: -1, mt: -1 }}>
                        <Stack direction="row" justifyContent="center" alignItems="center" spacing={5}>
                            <img src={props.img} alt={props.title} width={50} height={50} />
                            <Typography component="h4" variant="h4" textAlign="center" >
                                {props.title}
                            </Typography>
                        </Stack>
                    </CardContent>

                </Card>
            </CardActionArea>
        </Grid >
    );
}

export default Header;