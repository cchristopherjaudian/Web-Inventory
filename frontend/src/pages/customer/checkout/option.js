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
                sx={{ width: 100, height: 100, display: { xs: 'none', sm: 'block' } }}
                image="https://placehold.co/100"
                alt={props.name}
            />
            <CardContent sx={{ flex: 1, ml: -1, mt: -1 }}>
                <Stack direction="column" justifyContent="center">
                    <Typography component="caption" variant="caption" textAlign="left" sx={{ lineHeight: 2 }}>
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