import {thunk} from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './Menu/MenuSlice.js';
import studentReducer from './Student/Reducer.js';
import employeeReducer from './EmployeeController/EmployeeReducer.js';
import productReducer from './Product/Reducer.js';
import UserCurrent from './UserCurrent';
import employeeNew from './Employee/employeeSlice.js';


export const store = configureStore({
    reducer: {
        menu: menuReducer,
        student: studentReducer,
        employee: employeeReducer,
        employeeNew: employeeNew,
        products: productReducer,
        userCurrent: UserCurrent,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});