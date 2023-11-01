import MainCard from "components/MainCard";
import Header from "./header";
import Info from "./info";
import PurchaseTable from "./purchasetable";
import Options from "./options";

const Quotation = () => {
    return (
        <MainCard>
            <Header/>
            <Info/>
            <PurchaseTable/>
            <Options/>
        </MainCard>
    );
}
 
export default Quotation;