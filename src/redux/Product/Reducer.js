// reducer.js
import { ADD_PRODUCTS, REMOVE_PRODUCTS, UPDATE_PRODUCTS, RESTORE_PRODUCTS } from "./Actions";
import data from "./Data";

const initialState = data;

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCTS:
            return [...state, action.payload];
        case REMOVE_PRODUCTS:
            return state.map((product) =>
                product.productId === action.payload ? { ...product, status: false } : product
            );
        case RESTORE_PRODUCTS:
            return state.map((product) =>
                product.productId === action.payload ? { ...product, status: true } : product
            );
        case UPDATE_PRODUCTS:
            return state.map((product) =>
                product.productId === action.payload.productId ? { ...product, ...action.payload } : product
            );
        default:
            return state;
    }
};

export default productsReducer;
