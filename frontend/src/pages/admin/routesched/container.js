import {
    Grid
} from '@mui/material';
import Data from './data';
import useAxios from 'hooks/useAxios';
import { useState,useEffect } from 'react';
const Container = () => {
    const {data} = useAxios('schedules','GET');
    const [schedules,setSchedules] = useState([]);
    useEffect(()=>{
        if(data){
            setSchedules(data['data']);
        }
    },[data])
    return (
        <Grid container spacing={0.5} sx={{ mt: 1 }}>
            <Grid xs={12} lg={3} direction="column">
                {
                    schedules.map((s,i)=>{
                        return <Data header={s['route']} subheader=''/>
                    })
                }
                
            </Grid>
            <Grid xs={12} lg={3} direction="column">
               
            </Grid>
            <Grid xs={12} lg={3} direction="column">
                
            </Grid>
            <Grid xs={12} lg={3} direction="column">
               
            </Grid>
        </Grid>
    );
}

export default Container;