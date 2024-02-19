import MainCard from "components/MainCard";
import Header from "./header";
import Cart from "./cart";
import OrderConfirmation from "./OrderConfirmation";
const PRInfo = () => {
    return ( 
    <MainCard sx={{pt:3}}>
        <Header/>
        <Cart/>
        <OrderConfirmation/>
    </MainCard> );
}
 
export default PRInfo;