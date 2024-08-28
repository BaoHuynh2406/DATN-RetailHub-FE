import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Giả sử bạn có một API để lấy danh sách sinh viên
const apiFetchStudents = async () => {
    const response = await fetch('/api/students');
    if (!response.ok) {
        throw new Error('Failed to fetch students');
    }
    return response.json();
};

// Tạo một async thunk để fetch danh sách sinh viên
export const fetchStudentsAsync = createAsyncThunk(
    'student/fetchStudents',
    async () => {
        const students = await apiFetchStudents();
        return students; // Giá trị này sẽ được thêm vào action.payload
    }
);

const initialState = {
    students: [],
    status: 'idle',
    error: null,
};

const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        // Các reducer khác
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStudentsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchStudentsAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Cập nhật danh sách sinh viên vào store
                state.students = action.payload;
            })
            .addCase(fetchStudentsAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

// Export reducer
export default studentSlice.reducer;
