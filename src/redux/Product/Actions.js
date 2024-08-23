// Actions.js
export const ADD_PRODUCTS = 'ADD_PRODUCTS';
export const REMOVE_PRODUCTS = 'REMOVE_PRODUCTS';
export const UPDATE_PRODUCTS = 'UPDATE_PRODUCTS';
export const RESTORE_PRODUCTS = 'RESTORE_PRODUCTS';

export const addProducts = (product) => ({
    type: ADD_PRODUCTS,
    payload: product,
});

export const removeProducts = (id) => ({
    type: REMOVE_PRODUCTS,
    payload: id,
});

export const restoreProducts = (id) => ({
    type: RESTORE_PRODUCTS,
    payload: id,
});

export const updateProducts = (product) => ({
    type: UPDATE_PRODUCTS,
    payload: product,
});
