import { Grid, Typography } from '@mui/material';
import { toPng } from 'html-to-image';
import html2pdf from 'html2pdf.js/dist/html2pdf.min';
import MainCard from 'components/MainCard';
import Header from './header';
import Info from './info';
import PurchaseTable from './purchasetable';
import Options from './options';
import useAxios from 'hooks/useAxios';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Quotation = () => {
  let { id } = useParams();
  const [quoteInfo, setQuoteInfo] = useState({});
  const { data } = useAxios('purchase/' + id, 'GET', null, false);
  const quotationBody = useRef(null);
  const [showHeader, setShowHeader] = useState(false);
  const profile = useSelector((state) => state.profile);
  const filename = `${profile?.firstName.firstName}_${profile?.middleName.middleName ?? ''}_${profile?.lastName.lastName}-quotation`;

  const generatePdf = () => {
    setShowHeader(() => true);
    html2pdf()
      .from(quotationBody.current)
      .set({
        margin: 0.6,
        filename: filename + '.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
      })
      .toPdf()
      .get('pdf')
      .then((pdf) => {
        const totalPages = pdf.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
          pdf.setPage(i);
          pdf.setFontSize(10);
          pdf.setTextColor(150);
          pdf.text(`page ${i} of ${totalPages}`, pdf.internal.pageSize.getWidth() / 1.15, pdf.internal.pageSize.getHeight() / 1.02);
        }
      })
      .save()
      .finally(() => {
        setShowHeader(() => false);
      });
  };

  const generatePng = () => {
    setShowHeader(() => true);
    quotationBody.current.style.padding = '100px';
    toPng(quotationBody.current, {
      cacheBust: false,
      backgroundColor: '#FFFFFF'
    })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = filename + '.png';
        link.href = dataUrl;
        link.click();
        link.remove();
      })
      .finally(() => {
        quotationBody.current.style.padding = '0px';
        setShowHeader(() => false);
      });
  };

  useEffect(() => {
    if (data) {
      const totalValue = data['data']['list']?.reduce((total, item) => {
        return total + item.quantity * item.products.price;
      }, 0);
      setQuoteInfo({ ...data['data'], totalAmount: totalValue });
    }
  }, [data]);

  return (
    <MainCard>
      <Header quoteInfo={quoteInfo} />
      <div ref={quotationBody}>
        {showHeader ? (
          <Grid item xs={12}>
            <Typography variant="h2" align="center">
              Purchase Quotation
            </Typography>
          </Grid>
        ) : (
          ''
        )}
        <Info quoteInfo={quoteInfo} />
        <PurchaseTable quoteInfo={quoteInfo} />
      </div>
      <Options initPdf={generatePdf} initPng={generatePng} quoteInfo={quoteInfo} />
    </MainCard>
  );
};

export default Quotation;
