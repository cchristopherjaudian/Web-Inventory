import { styled } from '@mui/system';
import { Button,TextField } from '@mui/material';
import { MessageOutlined } from '@ant-design/icons';
const useStyles = styled((theme) =>
({
    wrapForm: {
        display: "flex",
        justifyContent: "center",
        width: "95%",
        margin: `${theme.spacing(0)} auto`
    },
    wrapText: {
        width: "100%"
    }
})
);

const TextInput = () => {
    const classes = useStyles();
    return (<>
        <form className={classes.wrapForm} noValidate autoComplete="off">
            <TextField
                id="standard-text"
                label=""
                className={classes.wrapText}
            />
            <Button variant="contained" color="primary" className={classes.button}>
                <MessageOutlined />
            </Button>
        </form>
    </>);
}

export default TextInput;