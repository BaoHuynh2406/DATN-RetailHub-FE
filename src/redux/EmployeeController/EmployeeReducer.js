import EmployeeData from "./EmployeeData";
import { ADD_EMPLOYEE,REMOVE_EMPLOYEE,UPDATE_EMPLOYEE } from "./EmployeeAction";
const initialState = EmployeeData;

const employeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_EMPLOYEE:
            return [...state, action.payload];
        case REMOVE_EMPLOYEE:
            return state.filter((employee) => employee.id !== action.payload);
        case UPDATE_EMPLOYEE:
            return state.map((employee) =>
                employee.id === action.payload.id ? { ...employee, ...action.payload } : employee
            );
        default:
            return state;
    }
};

export default employeeReducer;
