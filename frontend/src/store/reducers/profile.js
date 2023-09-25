import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    firstName: '',
    middleName: '',
    lastName: '',
    address: ''
};


const profile = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setFirstName: (state, action) => {
            state.firstName = action.payload;
        },
        setMiddleName: (state, action) => {
            state.middleName = action.payload;
        },
        setLastName: (state, action) => {
            state.lastName = action.payload;
        },
        setAddress: (state, action) => {
            state.address = action.payload;
        }
    }
});


export default profile.reducer;

export const { setFirstName, setMiddleName, setLastName, setAddress } = profile.actions;
