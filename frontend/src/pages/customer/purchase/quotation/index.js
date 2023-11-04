import MainCard from "components/MainCard";
import Header from "./header";
import Info from "./info";
import PurchaseTable from "./purchasetable";
import Options from "./options";
import useAxios from "hooks/useAxios";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
const Quotation = () => {
    let { id } = useParams();
    const [quoteInfo,setQuoteInfo] = useState({});
    const {data} = useAxios('purchase/' + id,'GET',null,false);

    useEffect(()=>{
        if(data){
            
            let totalValue = data['data']['list']?.reduce((total, item) => {
                return total + (item.quantity * item.products.price);
            }, 0);
            setQuoteInfo({...data['data'],totalAmount: totalValue});
        }
    },[data]);
    return (
        <MainCard>
            <Header quoteInfo={quoteInfo}/>
            <Info quoteInfo={quoteInfo}/>
            <PurchaseTable quoteInfo={quoteInfo}/>
            <Options quoteInfo={quoteInfo}/>
        </MainCard>
    );
}
 
export default Quotation;