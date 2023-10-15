import { configureStore } from '@reduxjs/toolkit';
import reducers from './reducers';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'primary',
  storage
  // whitelist: ['profile', 'menu', 'token', 'cart']
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
});
const { dispatch } = store;

export { store, dispatch };
