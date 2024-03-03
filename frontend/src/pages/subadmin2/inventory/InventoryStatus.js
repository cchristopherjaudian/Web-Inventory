import ProductQuantity from './ProductQuantity';
import MainCard from 'components/MainCard';
import { Grid, Typography } from '@mui/material';
const InventoryStatus = (props) => {
    return ( <Grid item xs={12}>
      <Grid direction="column" container spacing={0.5} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Grid item xs={12} style={{ display: 'flex', flex: 1 }}>
          <MainCard title="Low Quantity Stock" sx={{ width: '100%' }}>
            <Grid direction="row" container spacing={0.8} sx={{ mt: -4 }}>
              {props.lowStock?.map((stock, index) => {
                return <ProductQuantity stock={stock} key={index} />;
              })}
            </Grid>
          </MainCard>
        </Grid>
        <Grid item xs={12} style={{ display: 'flex', flex: 1 }}>
          <MainCard title="High Quantity Stock" sx={{ width: '100%' }}>
            <Grid direction="row" container spacing={0.8} sx={{ mt: -4 }}>
              {props.highStock?.map((stock, index) => {
                return <ProductQuantity stock={stock} key={index} />;
              })}
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
    </Grid> );
}
 
export default InventoryStatus;