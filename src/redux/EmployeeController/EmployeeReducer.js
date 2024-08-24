import EmployeeData from "./EmployeeData";
import { ADD_EMPLOYEE, REMOVE_EMPLOYEE, UPDATE_EMPLOYEE, RESTORE_EMPLOYEE } from "./EmployeeAction";
const initialState = EmployeeData;

const employeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_EMPLOYEE:
            return [...state, action.payload];
        case REMOVE_EMPLOYEE:
            return state.map((employee) =>
                employee.userId === action.payload ? { ...employee, status: false } : employee
            );
        case UPDATE_EMPLOYEE:
            return state.map((employee) =>
                employee.userId === action.payload.userId ? { ...employee, ...action.payload } : employee
            );
        case RESTORE_EMPLOYEE:
            return state.map((employee) =>
                employee.userId === action.payload ? { ...employee, status: true } : employee
            );
        default:
            return state;
    }
};

export default employeeReducer;
