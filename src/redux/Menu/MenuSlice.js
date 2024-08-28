import { createSlice } from '@reduxjs/toolkit';

const menuSlice = createSlice({
    name: 'menu',
    initialState: { menuSelected: null },
    reducers: {
        setMenuSelected(state, action) {
            state.menuSelected = action.payload;
        },
    },
});

export const { setMenuSelected } = menuSlice.actions;
export default menuSlice.reducer;
