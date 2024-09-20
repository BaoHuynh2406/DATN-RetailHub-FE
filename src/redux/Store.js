import {thunk} from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './Menu/MenuSlice.js';
import studentReducer from './Student/Reducer.js';
import UserCurrent from './UserCurrent';
import employeeNew from './Employee/employeeSlice.js';
import CustomerSlice from './Customer/CustomerSlice.js';
import ProductSlice from './Product/ProductSlice.js';
export const store = configureStore({
    reducer: {
        menu: menuReducer,
        student: studentReducer,
        employeeNew: employeeNew,
        ProductSlice: ProductSlice,
        userCurrent: UserCurrent,
        customer: CustomerSlice,

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});