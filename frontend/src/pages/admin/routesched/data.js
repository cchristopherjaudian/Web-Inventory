import {
    Card,
    CardActionArea,
    CardContent,
    Grid,
    Stack,
    Typography
} from '@mui/material';

const Data = (props) => {
    return (
        <Grid item xs={6} sx={{mt:0.5}}>
            <CardActionArea>
                <Card>
                    <CardContent sx={{ flex: 1, ml: -1, mt: -1 }}>
                        <Stack direction="row" justifyContent="center" alignItems="center" spacing={5}>
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

export default Data;