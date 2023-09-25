import { useSelector } from "react-redux";
import CartItemList from "layout/MainLayout/Header/HeaderContent/CartItemList";
const Cart = (props) => {
    const cartList = useSelector((state) => state.cart.cart);
    return (
        <>
            {
                cartList.map((item, index) => {
                    return <CartItemList key={index} item={item} />
                })
            }
        </>
    );
}

export default Cart;