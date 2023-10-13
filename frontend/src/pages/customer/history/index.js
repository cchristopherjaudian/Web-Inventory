import MainCard from "components/MainCard";
import HistoryTable from "./HistoryTable";
import { useState, useEffect } from "react";
import useAxios from "hooks/useAxios";
const History = () => {
    const { data } = useAxios('orders/endusers', 'GET', null, false);
    const [transactions, setTransactions] = useState([]);
    useEffect(() => {
        if (data) {
            let newData = [];
            data['data'].map((d,i)=>{
                newData.push({
                    id:d['id'],
                    dateOrdered: d['createdAt'],
                    paymentMethod: d['paymentMethod'],
                    orderItems: d['orderItems'].length,
                    status: d['status'],
                    dateDispatched: d['orderStatus'][1] ? d['orderStatus'][1]['createdAt'] : null,
                    dateDelivered: d['orderStatus'][2] ? d['orderStatus'][2]['createdAt'] : null
                });
            }); 
            setTransactions(newData);
        }
    }, [data]);
    return (<MainCard>
        <h3>History</h3>
        <HistoryTable transactions={transactions} />
    </MainCard>);
}

export default History;