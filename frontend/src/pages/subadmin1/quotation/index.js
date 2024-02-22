import firebaseConfig from 'config/firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
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
import { useSelector } from 'react-redux';
import OrderConfirmation from './OrderConfirmation';
import { reduceEachTrailingCommentRange } from '../../../../node_modules/typescript/lib/typescript';

let messageRef = null;
const Quotation = () => {
  const myMobile = useSelector((state) => state.profile.contact.contact);
  const myPhoto = useSelector((state) => state.profile.photoUrl.photoUrl);
  const fn = useSelector((state) => state.profile.firstName.firstName);
  const ln = useSelector((state) => state.profile.lastName.lastName);
  const myName = fn + ' ' + ln;
  const msgTitle = 'Create Quotation';
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useAxios('purchase/' + id, 'GET', null, false);
  const [orderInfo, setOrderInfo] = useState({});
  const [orderList, setOrderList] = useState([]);
  const [finalList, setFinalList] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({});
  const { highData, highFetchData } = useHighAxios('prices/purchase-request', 'POST', { pr: finalList });
  const [totalPrice, setTotalPrice] = useState(0);

  const [firebaseApp] = useState(() => {
    if (!firebase.apps.length) {
      return firebase.initializeApp(firebaseConfig);
    } else {
      return firebase.app();
    }
  });
  const database = firebaseApp.database();

  useEffect(() => {
    if (data) {
      setOrderInfo({
        dateRequested: data?.data?.dateRequested,
        groupNo: data?.data?.groupNo
      });
      setCustomerInfo(data?.data?.customerInfo);
      setOrderList(data?.data?.list);
    }
  }, [data]);
  function createQuotation() {

    const invalidPrice = orderList.some(obj => obj['PrCustomPrices'] === null || obj['PrCustomPrices'] === 0);
    if (invalidPrice) {
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
        let customerType = 'B2B';
        let customerMobile = customerInfo.id;
        let quoteId = highData.data.id;
        let newMessage = {
          content: '',
          orderId: quoteId,
          img: '',
          type: 'quote',
          time: new Date().toISOString(),
          src: myMobile,
          mobile: myMobile,
          name: myName,
          photoUrl: myPhoto
        };
        //uncomment pag may mobile number na
        // messageRef = database.ref(customerType + '/recipients/' + customerMobile + '/chat/messages/');
        // messageRef.push(newMessage);
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
      <Header customerInfo={customerInfo} orderInfo={orderInfo} />
      <Grid item xs={12}>
        <Typography variant="h2" align="center">
          Purchase Quotation
        </Typography>
      </Grid>

      <Info customerInfo={customerInfo} />
      <PurchaseTable orderList={orderList} updateProductProperty={updateProductProperty} />

      <OrderConfirmation orderInfo={orderInfo} createQuotation={createQuotation} totalPrice={totalPrice} customerInfo={customerInfo} />
    </MainCard>
  );
};

export default Quotation;
