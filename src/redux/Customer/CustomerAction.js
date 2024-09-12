// Action types for customers
export const ADD_CUSTOMER = 'ADD_CUSTOMER';
export const REMOVE_CUSTOMER = 'REMOVE_CUSTOMER';
export const UPDATE_CUSTOMER = 'UPDATE_CUSTOMER';
export const RESTORE_CUSTOMER = 'RESTORE_CUSTOMER';

// Action creators for customers
export const addCustomer = (customer) => ({
    type: ADD_CUSTOMER,
    payload: customer,
});

export const removeCustomer = (customerId) => ({
    type: REMOVE_CUSTOMER,
    payload: customerId,
});

export const restoreCustomer = (customerId) => ({
    type: RESTORE_CUSTOMER,
    payload: customerId,
});

export const updateCustomer = (customer) => ({
    type: UPDATE_CUSTOMER,
    payload: customer,
});
