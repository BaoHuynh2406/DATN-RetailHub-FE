export const ADD_EMPLOYEE = 'ADD_EMPLOYEE';
export const REMOVE_EMPLOYEE = 'REMOVE_EMPLOYEE';
export const UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE';

export const addEmployee = (employee) => ({
    type: ADD_EMPLOYEE,
    payload: employee,
});

export const removeEmployee = (id) => ({
    type: REMOVE_EMPLOYEE,
    payload: id,
});

export const updateEmployee = (employee) => ({
    type: UPDATE_EMPLOYEE,
    payload: employee,
});
