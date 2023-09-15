import { Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import TransactionTable from './TransactionTable';

const TransactionRecords = () => (
  <MainCard title="Transaction Records">
    <TransactionTable />
  </MainCard>
);

export default TransactionRecords;
