import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cart: [],
};


const cart = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action) => {
            const index = state.cart.findIndex(item => item.key === action.payload.key);
            if (index >= 0) {
                state.cart[index] = action.payload;
            } else {
                state.cart.push(action.payload);
            }
        },
        removeItem: (state, action) => {
            const filteredArray = state.cart.filter(obj => obj.id !== action.payload);
            state.cart = filteredArray;
        },
        emptyCart: (state)=>{
            state.cart = [];
        }
    }
});


export default cart.reducer;

export const { setCart, removeItem,emptyCart } = cart.actions;
