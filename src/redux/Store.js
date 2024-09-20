import {thunk} from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './Menu/MenuSlice.js';
import studentReducer from './Student/Reducer.js';
import productReducer from './Product/Reducer.js';
import UserCurrent from './UserCurrent';
import employeeNew from './Employee/employeeSlice.js';
import CustomerSlice from './Customer/CustomerSlice.js';
export const store = configureStore({
    reducer: {
        menu: menuReducer,
        student: studentReducer,
        employeeNew: employeeNew,
        products: productReducer,
        userCurrent: UserCurrent,
        customer: CustomerSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});