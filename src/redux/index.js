import { combineReducers } from 'redux';
import menuReducer from './menu/menuSelected.js';
import studentReducer from './Student/Reducer.js';
import employeeReducer from './EmployeeController/EmployeeReducer.js';

const rootReducer = combineReducers({
    menu: menuReducer,
    student: studentReducer,
    employee:employeeReducer
});

export default rootReducer;
