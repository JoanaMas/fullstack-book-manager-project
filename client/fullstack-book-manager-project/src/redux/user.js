import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        value: {
            user: null,
            users: [],
        }
    },


    reducers: {

    }
})

export const {} = userSlice.actions;

export default userSlice.reducer;