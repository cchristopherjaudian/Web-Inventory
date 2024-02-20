import MainCard from "components/MainCard";
import Header from "./header";
import Cart from "./cart";
import OrderConfirmation from "./OrderConfirmation";
import { useParams } from "react-router-dom";
import useAxios from "hooks/useAxios";
import { useEffect, useState } from "react";
const PRInfo = () => {
    const { id } = useParams();
    const { data } = useAxios('purchase/' + id, 'GET', null, false);
    const [orderList,setOrderList] = useState([]);
    useEffect(()=>{
        if(data){
            setOrderList(data?.data?.list);
        }
    },[data]);
    return (
        <MainCard sx={{ pt: 3 }}>
            <Header />
            <Cart orderList = {orderList}/>
            <OrderConfirmation orderId={id} />
        </MainCard>);
}

export default PRInfo;