import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import { axiosSecure } from '@/config/axiosInstance';

// Utility function for error extraction
const extractErrorMessage = (error) => error.response?.data?.message || error.message;

// Define thunks

//Fetch
export const fetchEmployeesAsync = createAsyncThunk('employees/fetchEmployeesAsync', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosSecure.get('/api/user/getAll');
        console.log(response.data.data);
        return response.data.data;
    } catch (error) {
        return rejectWithValue(extractErrorMessage(error));
    }
});

// fetch by id
export const fetchEmployeeByIdAsync = createAsyncThunk(
    'employees/fetchEmployeeByIdAsync',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axiosSecure.get(`/api/user/${userId}`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(extractErrorMessage(error));
        }
    },
);

export const addEmployeeAsync = createAsyncThunk(
    'employees/addEmployeeAsync',
    async (employee, { dispatch, rejectWithValue }) => {
        dispatch(addEmployee(employee)); //Cập nhật ngay lập tức
        // Xử lý bất đồng bộ
        try {
            const response = await axiosSecure.post('/api/user/create', employee);
            return response.data.data;
        } catch (error) {
            //Nếu có lỗi thì xóa thằng nhân viên vừa thêm vào
            dispatch(removeEmployee(employee.userId));
            return rejectWithValue(extractErrorMessage(error));
        }
    },
);

export const removeEmployeeAsync = createAsyncThunk(
    'employees/removeEmployeeAsync',
    async (userId, { dispatch, rejectWithValue }) => {
        dispatch(removeEmployee(userId)); // Optimistic update

        try {
            await axiosSecure.delete(`/api/employees/${userId}`);
        } catch (error) {
            dispatch(restoreEmployee(userId)); // Revert update
            return rejectWithValue(extractErrorMessage(error));
        }
    },
);

export const updateEmployeeAsync = createAsyncThunk(
    'employees/updateEmployeeAsync',
    async (employee, { dispatch, getState, rejectWithValue }) => {   
        let employeeBackup;
        //Lấy ra thằng nhân viên muốn sửa để lưu tạm lại, phòng có lỗi
       try {
        const response = await axiosSecure.get(`/api/user/${employee.userId}`);
        employeeBackup = response.data.data;
       } catch (error) {
            alert('Mã nhân viên lỗi');
            return rejectWithValue(extractErrorMessage(error));
       }
        dispatch(updateEmployee(employee)); // Cập nhật ngay lập tức
        try {
            const response = await axiosSecure.put('/api/user/update', employee);
            return response.data.data;
        } catch (error) {
            dispatch(updateEmployee(employeeBackup)); // Có lỗi thì hoàn tác việc sửa lúc nảy
            return rejectWithValue(extractErrorMessage(error));
        }
    },
);

export const restoreEmployeeAsync = createAsyncThunk(
    'employees/restoreEmployeeAsync',
    async (userId, { dispatch, rejectWithValue }) => {
        dispatch(restoreEmployee(userId)); // Optimistic update

        try {
            await axiosSecure.post(`/api/employees/restore/${userId}`);
        } catch (error) {
            dispatch(removeEmployee(userId)); // Revert update
            return rejectWithValue(extractErrorMessage(error));
        }
    },
);

// Define slice
const employeesSlice = createSlice({
    name: 'employees',
    initialState: {
        data: [],
        currentData: null,
        loading: false,
        error: null,
    },
    reducers: {
        addEmployee: (state, action) => {
            state.data.push(action.payload);
        },
        removeEmployee: (state, action) => {
            state.data = state.data.map((employee) =>
                employee.userId === action.payload ? { ...employee, status: false } : employee,
            );
        },
        updateEmployee: (state, action) => {
            state.data = state.data.map((emp) =>
                emp.userId === action.payload.userId ? { ...emp, ...action.payload } : emp,
            );
        },
        findEmployee: (state, action) => {
            const employee = state.data.find((item) => item.userId == action.payload);
            if (employee) {
                state.currentData = employee;
                state.error = null;
            } else {
                state.currentData = null;
                state.error = `Employee with ID ${action.payload.userId} not found`;
            }
        },

        restoreEmployee: (state, action) => {
            state.data = state.data.map((employee) =>
                employee.userId === action.payload ? { ...employee, status: true } : employee,
            );
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // fetch all
            .addCase(fetchEmployeesAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmployeesAsync.fulfilled, (state, action) => {
                state.data = action.payload; // Changed from list to data
                state.loading = false;
            })
            .addCase(fetchEmployeesAsync.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            // fetch by id
            .addCase(fetchEmployeeByIdAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmployeeByIdAsync.fulfilled, (state, action) => {
                state.currentData = action.payload;
                state.loading = false;
            })
            .addCase(fetchEmployeeByIdAsync.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            // add
            .addCase(addEmployeeAsync.fulfilled, (state) => {
                state.error = null;
            })
            .addCase(addEmployeeAsync.rejected, (state, action) => {
                state.error = action.payload;
            })
            // remove
            .addCase(removeEmployeeAsync.fulfilled, (state) => {
                state.error = null;
            })
            .addCase(removeEmployeeAsync.rejected, (state, action) => {
                state.error = action.payload;
            })
            // update
            .addCase(updateEmployeeAsync.fulfilled, (state) => {
                state.error = null;
            })
            .addCase(updateEmployeeAsync.rejected, (state, action) => {
                state.error = action.payload;
            })
            // restore
            .addCase(restoreEmployeeAsync.fulfilled, (state) => {
                state.error = null;
            })
            .addCase(restoreEmployeeAsync.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { addEmployee, removeEmployee, updateEmployee, restoreEmployee, setError, findEmployee } =
    employeesSlice.actions;

export default employeesSlice.reducer;
