import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Chip,
    Stack,
    Typography
} from '@mui/material';

const Option = (props) => {
   
    return (<CardActionArea>
        <Card sx={{ display: 'flex', height: 100 }}>
            <CardMedia
                component="img"
                sx={{ m: 1, width: 80, height: 80, display: { xs: 'none', sm: 'block' } }}
                image={props.img}
                alt={props.name}
            />
            <CardContent sx={{ flex: 1, ml: -1, mt: -1 }}>
                <Stack direction="column" justifyContent="center">
                    <Typography component="caption" variant="h6" textAlign="left" sx={{ lineHeight: 2 }}>
                        {props.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1, fontSize: '0.6rem' }}>
                        {props.description}
                    </Typography>
                </Stack>
            </CardContent>

        </Card>
    </CardActionArea>);
}

export default Option;