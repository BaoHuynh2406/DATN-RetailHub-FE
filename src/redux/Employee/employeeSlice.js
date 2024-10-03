import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import { axiosSecure } from '@/config/axiosInstance';

// Utility function for error extraction
const extractErrorMessage = (error) => error.response?.data?.message || error.message;

// Define thunks

// Chưa xóa
export const fetchEmployeesAvailableAsync = createAsyncThunk(
    'employees/fetchEmployeesAvailableAsync',
    async ({ page, size }, { rejectWithValue }) => {
        try {
            const response = await axiosSecure.get('/api/v2/user/getAll-available-users', {
                params: {
                    page: page,
                    size: size,
                },
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(extractErrorMessage(error));
        }
    },
);

// Đã xóa
export const fetchEmployeesDeletedAsync = createAsyncThunk(
    'employees/fetchEmployeesDeletedAsync',
    async ({ page, size }, { rejectWithValue }) => {
        try {
            const response = await axiosSecure.get('/api/v2/user/getAll-deleted-users', {
                params: {
                    page: page,
                    size: size,
                },
            });
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(extractErrorMessage(error));
        }
    },
);

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

// add employee
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

// remove employee
export const removeEmployeeAsync = createAsyncThunk(
    'employees/removeEmployeeAsync',
    async (userId, { dispatch, rejectWithValue }) => {
        dispatch(removeEmployee(userId));
        try {
            await axiosSecure.delete(`/api/user/delete/${userId}`);
        } catch (error) {
            dispatch(restoreEmployee(userId)); // Revert update
            return rejectWithValue(extractErrorMessage(error));
        }
    },
);

// update employee
export const updateEmployeeAsync = createAsyncThunk(
    'employees/updateEmployeeAsync',
    async (employee, { dispatch, rejectWithValue }) => {
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

export const toggleActiveEmployeeAsync = createAsyncThunk(
    'employee/toggleActiveEmployee',
    async (userId, { dispatch, rejectWithValue }) => {
        dispatch(toggleActiveEmployee(userId));
        try {
            await axiosSecure.put(`/api/user/toggle-active/${userId}`);
        } catch (error) {
            // Hoàn tác lại nếu có lỗi
            dispatch(toggleActiveEmployee(userId));
            return rejectWithValue(extractErrorMessage(error));
        }
    },
);

// restore employee
export const restoreEmployeeAsync = createAsyncThunk(
    'employees/restoreEmployeeAsync',
    async (userId, { dispatch, rejectWithValue }) => {
        dispatch(restoreEmployee(userId));
        try {
            await axiosSecure.put(`/api/user/restore/${userId}`);
        } catch (error) {
            dispatch(removeEmployee(userId));
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
            if (state.data.data) {
                state.data.data.push(action.payload);
            }
        },
        removeEmployee: (state, action) => {
            if (state.data.data) {
                state.data.data = state.data.data.filter((employee) => employee.userId !== action.payload);
            }
            state.currentData = null;
        },
        updateEmployee: (state, action) => {
            if (state.data.data) {
                state.data.data = state.data.data.map((emp) =>
                    emp.userId === action.payload.userId ? { ...emp, ...action.payload } : emp,
                );
            }
            state.currentData = action.payload;
        },
        findEmployee: (state, action) => {
            if (state.data.data) {
                const employee = state.data.data.find((item) => item.userId == action.payload);
                if (employee) {
                    state.currentData = employee;
                    state.error = null;
                } else {
                    state.currentData = null;
                    state.error = `Employee with ID ${action.payload} not found`;
                }
            }
        },

        restoreEmployee: (state, action) => {
            if (state.data.data) {
                state.data.data = state.data.data.filter((employee) => employee.userId !== action.payload);
            }
        },

        toggleActiveEmployee: (state, action) => {
            if (state.data.data) {
                state.data.data = state.data.data.map((employee) =>
                    employee.userId === action.payload ? { ...employee, isActive: !employee.isActive } : employee,
                );
            }
        },

        setError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // fetch all
            .addCase(fetchEmployeesAvailableAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmployeesAvailableAsync.fulfilled, (state, action) => {
                state.data = action.payload; // Changed from list to data
                state.loading = false;
            })
            .addCase(fetchEmployeesAvailableAsync.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            // fetch all deleted
            .addCase(fetchEmployeesDeletedAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmployeesDeletedAsync.fulfilled, (state, action) => {
                state.data = action.payload; // Changed from list to data
                state.loading = false;
            })
            .addCase(fetchEmployeesDeletedAsync.rejected, (state, action) => {
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
            .addCase(addEmployeeAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addEmployeeAsync.fulfilled, (state) => {
                state.error = null;
                state.loading = false;
            })
            .addCase(addEmployeeAsync.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            // remove
            .addCase(removeEmployeeAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeEmployeeAsync.fulfilled, (state) => {
                state.error = null;
                state.loading = false;
            })
            .addCase(removeEmployeeAsync.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            // update
            .addCase(updateEmployeeAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateEmployeeAsync.fulfilled, (state) => {
                state.error = null;
                state.loading = false;
            })
            .addCase(updateEmployeeAsync.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            // toggle active
            .addCase(toggleActiveEmployeeAsync.pending, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(toggleActiveEmployeeAsync.fulfilled, (state) => {
                state.error = null;
                state.loading = false;
            })
            .addCase(toggleActiveEmployeeAsync.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            // restore
            .addCase(restoreEmployeeAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(restoreEmployeeAsync.fulfilled, (state) => {
                state.error = null;
                state.loading = false;
            })
            .addCase(restoreEmployeeAsync.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    },
});

export const {
    addEmployee,
    removeEmployee,
    updateEmployee,
    restoreEmployee,
    toggleActiveEmployee,
    setError,
    findEmployee,
} = employeesSlice.actions;

export default employeesSlice.reducer;
