import { Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import TransactionTable from './TransactionTable';
import { useState, useEffect } from 'react';
import useAxios from 'hooks/useAxios';
const TransactionRecords = () => {
  const [transactions, setTransactions] = useState([]);
  const { data } = useAxios('orders/transactions', 'GET', null, false);
  useEffect(() => {
    if (data) {
      let newData = [];
      data['data'].map((d, i) => {
        newData.push({ ...d, id: i });
      });
      setTransactions(newData);
    }
  }, [data]);
  return <MainCard title="Transaction Records">
    <TransactionTable transactions={transactions}/>
  </MainCard>
};

export default TransactionRecords;
