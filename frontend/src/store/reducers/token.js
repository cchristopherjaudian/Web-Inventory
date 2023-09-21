import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: '',
    name: '',
    authenticated: false,
    isadmin: false,
    admintype: 0, //0 - Super, 1 - Sub1, 2 - Sub2
    customertype: 0 //0 - B2C, 1 - B2B
};


const token = createSlice({
    name: 'token',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setAuth: (state, action) => {

            state.authenticated = action.payload;
        },
        setAdmin: (state, action) => {
            state.isadmin = action.payload;
        },
        setAdminType: (state, action) => {
            state.admintype = action.payload;
        },
        setCustomerType: (state, action) => {
            state.customertype = action.payload;
        },
        setName: (state, action) => {
            state.name = action.payload;
        }
    }
});


export default token.reducer;

export const { setToken, setAuth, setAdmin, setAdminType, setCustomerType, setName } = token.actions;
