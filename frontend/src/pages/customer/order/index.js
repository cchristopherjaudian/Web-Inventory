import InvoiceStepper from "./stepper";
import { useParams } from "react-router-dom";
const Order = () => {
    const {id} = useParams();
    return ( <>
    <InvoiceStepper orderId={id}/>
    </>);
}
 
export default Order;