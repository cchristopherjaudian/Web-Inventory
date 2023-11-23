import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  firstName: '',
  middleName: '',
  lastName: '',
  address: '',
  emailAddress: '',
  contact: '',
  accType: '',
  businessName: '',
  photoUrl: ''
};

const profile = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setAccType: (state, action) => {
      state.accType = action.payload;
    },
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
    },
    setEmailAddress: (state, action) => {
      state.emailAddress = action.payload;
    },
    setContact: (state, action) => {
      state.contact = action.payload;
    },
    setBusinessName: (state, action) => {
      state.businessName = action.payload;
    },
    setPhotoUrl: (state, action) => {
      state.photoUrl = action.payload;
    }
  }
});

export default profile.reducer;

export const {
  setBusinessName,
  setContact,
  setFirstName,
  setMiddleName,
  setLastName,
  setAddress,
  setAccType,
  setEmailAddress,
  setPhotoUrl
} = profile.actions;
