import MainCard from "components/MainCard";
import HistoryTable from "./HistoryTable";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useAxios from "hooks/useAxios";
import QuotationTable from "./QuotationTable";
import { tr } from "date-fns/locale";
const History = () => {
    const isBusiness = useSelector((state) => state.token.customertype.customertype);
    const { data } = useAxios((isBusiness === 0 ? 'orders/endusers' : 'purchase'), 'GET', null, false);
    const [transactions, setTransactions] = useState([]);
    useEffect(() => {
        if (data) {
            let newData = [];
            data['data'].map((d, i) => {
                isBusiness === 0 ?
                newData.push({
                    id: d['id'],
                    dateOrdered: d['createdAt'],
                    paymentMethod: d['paymentMethod'],
                    orderItems: d['orderItems'].length,
                    status: d['status'],
                    dateDispatched: d['orderStatus'][1] ? d['orderStatus'][1]['createdAt'] : null,
                    dateDelivered: d['orderStatus'][2] ? d['orderStatus'][2]['createdAt'] : null
                })
                :
                newData.push({
                    id: d['id'],
                    groupNo: d['groupNo'],
                    dateRequested: d['dateRequested'],
                    dateRequired: d['dateRequired'],
                    quantity: d['quantity']
                })
            });
            setTransactions(newData);
        }
    }, [data]);
    return (<MainCard>
        <h3>History</h3>
        {
            isBusiness === 0 ?
                <HistoryTable transactions={transactions} />
                :
                <QuotationTable transactions={transactions} />
        }

    </MainCard>);
}

export default History;