import CustomerData from "./CustomerData";
import { ADD_CUSTOMER, REMOVE_CUSTOMER, UPDATE_CUSTOMER, RESTORE_CUSTOMER } from "./CustomerAction";

const initialState = CustomerData;

const customerReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CUSTOMER:
            return [...state, action.payload];

        case REMOVE_CUSTOMER:
            return state.map((customer) =>
                customer.customerId === action.payload ? { ...customer, isDelete: true } : customer
            );

        case UPDATE_CUSTOMER:
            return state.map((customer) =>
                customer.customerId === action.payload.customerId ? { ...customer, ...action.payload } : customer
            );

        case RESTORE_CUSTOMER:
            return state.map((customer) =>
                customer.customerId === action.payload ? { ...customer, isDelete: false } : customer
            );

        default:
            return state;
    }
};

export default customerReducer;
