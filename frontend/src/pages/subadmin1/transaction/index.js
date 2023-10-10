import TransactionTable from './TransactionTable';
import CustomerInfo from './customerinfo';
import { useState, useEffect } from 'react';
import useAxios from 'hooks/useAxios';
const TransactionRecords = () => {
  const [transactions, setTransactions] = useState([]);
  const { data, fetchData } = useAxios('orders/transactions', 'GET');
  useEffect(() => {
    if (data) {
      let newData = [];
      data['data'].map((d, i) => {
        newData.push({ ...d, id: i });
      });
      setTransactions(newData);
    }
  }, [data]);
  return <>
    <CustomerInfo fetchData={fetchData} />
    <TransactionTable transactions={transactions} />
  </>
};

export default TransactionRecords;
