import { combineReducers } from 'redux';
import menu from './menu';
import token from './token';

const reducers = combineReducers({ menu, token });

export default reducers;
