import { combineReducers } from 'redux';
import menuReducer from './menu/menuSelected.js';
import studentReducer from './Student/Reducer.js';
import productsReducer from './Product/Reducer.js';

const rootReducer = combineReducers({
    menu: menuReducer,
    student: studentReducer,
    products: productsReducer,
});

export default rootReducer;
