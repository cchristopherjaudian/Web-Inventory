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
            setQuoteInfo(data['data']);
            console.log(data['data']);
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