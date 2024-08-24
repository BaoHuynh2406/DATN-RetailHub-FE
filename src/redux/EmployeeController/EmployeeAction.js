export const ADD_EMPLOYEE = 'ADD_EMPLOYEE';
export const REMOVE_EMPLOYEE = 'REMOVE_EMPLOYEE';
export const UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE';
export const RESTORE_EMPLOYEE = 'RESTORE_EMPLOYEE';


export const addEmployee = (employee) => ({
    type: ADD_EMPLOYEE,
    payload: employee,
});


export const removeEmployee = (userId) => ({
    type: REMOVE_EMPLOYEE,
    payload: userId,
});
export const restoreEmployee = (userId) => ({
    type: RESTORE_EMPLOYEE,
    payload: userId,
});

export const updateEmployee = (employee) => ({
    type: UPDATE_EMPLOYEE,
    payload: employee,
});
