import { combineReducers } from 'redux';
import menuReducer from './menu/menuSelected.js';
import studentReducer from './Student/Reducer.js';
import goodsReducer from './Goods/Reducer.js';

const rootReducer = combineReducers({
    menu: menuReducer,
    student: studentReducer,
    goods: goodsReducer,
});

export default rootReducer;
