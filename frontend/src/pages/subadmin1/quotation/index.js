import { Grid, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import Header from './header';
import Info from './info';
import PurchaseTable from './purchasetable';

import Swal from 'sweetalert2';
import useAxios from 'hooks/useAxios';
import useHighAxios from 'hooks/useHighAxios';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import OrderConfirmation from './OrderConfirmation';
import { reduceEachTrailingCommentRange } from '../../../../node_modules/typescript/lib/typescript';


const Quotation = () => {
  const msgTitle='Create Quotation';
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useAxios('purchase/' + id, 'GET', null, false);

  const [orderList, setOrderList] = useState([]);
  const [finalList, setFinalList] = useState([]);
  const { highData, highFetchData } = useHighAxios('prices/purchase-request', 'POST', { pr: finalList });
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    if (data) {
      setOrderList(data?.data?.list);
    }
  }, [data]);
  function createQuotation() {
    
    const invalidPrice = orderList.some(obj => obj['PrCustomPrices'] === null || obj['PrCustomPrices'] === 0);
    if(invalidPrice){
      Swal.fire({
        icon: 'warning',
        title: msgTitle,
        text: 'Please input a valid price for each product'
      });
      return;
    }
    Swal.fire({
      icon: 'question',
      title: msgTitle,
      text: 'Are you sure you want to create this quotation?',
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        const priceList = orderList.map((p) => {
          return {
            price: p.PrCustomPrices,
            cartId: p.id
          };
        });
        setFinalList(priceList);
      }
    });
  }


function updateProductProperty(code, update) {

  const updatedProducts = orderList.map((p) => {
    if (p.products.code === code) {
      return { ...p, 'PrCustomPrices': update };
    }
    return p;
  });
  const rawPrice = updatedProducts.reduce((sum, item) => {
    const price = parseFloat(item.PrCustomPrices);
    return sum + (isNaN(price) ? 0 : item.quantity * price);
  }, 0);

  setTotalPrice(rawPrice);
  setOrderList(updatedProducts);
}

useEffect(() => {
  if (finalList.length > 0) highFetchData();
}, [finalList])
useEffect(() => {
  if (highData) {
    const responseCode = highData.status;
    if (responseCode === 200) {
      Swal.fire({
        title: msgTitle,
        text: 'Quotation created successfully. Click OK to continue',
        icon: 'success',
        allowOutsideClick: false,
        showCancelButton: false,
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/pr');
        }
      });
    } else {
      Swal.fire({
        title: msgTitle,
        text: 'Failed to create quotation. Please try again.',
        icon: 'error'
      });
    }
  }
}, [highData]);
return (
  <MainCard>
    <Header />
    <Grid item xs={12}>
      <Typography variant="h2" align="center">
        Purchase Quotation
      </Typography>
    </Grid>

    <Info />
    <PurchaseTable orderList={orderList} updateProductProperty={updateProductProperty} />

    <OrderConfirmation createQuotation={createQuotation} totalPrice={totalPrice} />
  </MainCard>
);
};

export default Quotation;
