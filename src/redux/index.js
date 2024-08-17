import { combineReducers } from 'redux';
import menuReducer from './menu/menuSelected.js';
import studentReducer from './Student/Reducer.js';

const rootReducer = combineReducers({
    menu: menuReducer,
    student: studentReducer,
});

export default rootReducer;
