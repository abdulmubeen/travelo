import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setCurrentUser: (state, action) => {
      if (action.payload === null) {
        return null;
      } else {
        state = {
          ...action.payload,
        };
        return state;
      }
    },
  },
});

export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
