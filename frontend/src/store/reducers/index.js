import { combineReducers } from 'redux';
import menu from './menu';
import token from './token';
import cart from './cart';
import profile from './profile';
const reducers = combineReducers({ menu, token, cart, profile });

export default reducers;
