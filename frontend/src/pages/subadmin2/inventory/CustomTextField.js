import { useState } from "react";
import { TextField } from '@mui/material';

const CustomTextField = (props) => {
    const [value, setValue] = useState(props.initialValue);
  
    const handleValueChange = (event) => {
      const newValue = event.target.value;
      setValue(newValue);
      props.onChange(newValue); 
    };
  
    return (
      <TextField
        id={props.id}
        fullWidth
        variant="outlined"
        value={value}
        onChange={handleValueChange}
        onClick={(e)=> e.stopPropagation()}
      />
    );
  };

  export default CustomTextField;