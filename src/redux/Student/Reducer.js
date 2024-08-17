import { ADD_STUDENT, REMOVE_STUDENT, UPDATE_STUDENT } from './Actions';
import data from './Data';

const initialState = data;

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_STUDENT:
            return [...state, action.payload];
        case REMOVE_STUDENT:
            return state.filter((student) => student.id !== action.payload);
        case UPDATE_STUDENT:
            return state.map((student) =>
                student.id === action.payload.id ? { ...student, ...action.payload } : student,
            );
        default:
            return state;
    }
};

export default dataReducer;
