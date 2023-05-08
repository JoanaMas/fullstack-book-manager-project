import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: {
      currentUser: null,
      users: [],
    },
  },

  reducers: {

    setCurrentUser: (state, action) => {
      state.value.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;

export default userSlice.reducer;
