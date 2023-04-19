import { createSlice } from '@reduxjs/toolkit';

export const actionsSlice = createSlice({
    name: 'actions',
    initialState: {
        value: {
            openCreateBookForm: false,
            openPictureUpload: false,
        }
    },

    reducers: {
        
        setOpenCreateBookForm: (state, action) => {
            state.value.openCreateBookForm = action.payload;
        },

        setOpenPictureUpload: (state, action) => {
            state.value.openPictureUpload = action.payload;
        }

    }
})

export const { setOpenCreateBookForm, setOpenPictureUpload } = actionsSlice.actions;

export default actionsSlice.reducer;