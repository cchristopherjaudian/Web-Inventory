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
    const [orderList, setOrderList] = useState([]);
    const [customerInfo, setCustomerInfo] = useState({});
    const [orderInfo, setOrderInfo] = useState({});
    useEffect(() => {
        if (data) {
            setOrderInfo({
                groupNo: data?.data?.groupNo,
                dateRequested: data?.data?.dateRequested,
                dateRequired: data?.data?.dateRequired
            });
            setCustomerInfo(data?.data?.customerInfo);
            setOrderList(data?.data?.list);
        }
    }, [data]);
    return (
        <MainCard sx={{ pt: 3 }}>
            <Header orderInfo={orderInfo} customerInfo={customerInfo} />
            <Cart orderList={orderList} />
            <OrderConfirmation orderId={id} orderInfo={orderInfo} customerInfo= {customerInfo}/>
        </MainCard>);
}

export default PRInfo;